import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, Button, ScrollView } from 'react-native';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [editTaskIndex, setEditTaskIndex] = useState(-1);
  const [editTaskText, setEditTaskText] = useState('');
  

  const handleAddTask = () => {
    Keyboard.dismiss();
    if(/\S/.test(task)){
      setTaskItems([...taskItems,task])
      //console.log(task)
      setTask('');
    }
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  const handleEditTask = (index) => {
    let itemsCopy = [...taskItems];
    setEditTaskIndex(index);
    setEditTaskText(itemsCopy[index]);
  }

  const handleSaveTask = () => {
    const updatedTasks = [...taskItems];
    updatedTasks[editTaskIndex] = editTaskText;
    setTaskItems(updatedTasks);
    setEditTaskIndex(-1);
  };
  

  return (
    <View style={styles.container}>
      {/* Today's Task */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <View style={styles.items}>
          {/* Tasks */}
          <ScrollView style={styles.scrollable}>
          {
            taskItems.map((item, index) => {
              return(
                <TouchableOpacity key={index} onLongPress={() => handleEditTask(index)} onPress={() => completeTask(index)} >
                  <Task  text={item}/>
                </TouchableOpacity>
              )
            })
          }
          </ScrollView>
        </View>
      </View>
      
      {/* Create a Task */}
      {editTaskIndex !== -1 && (
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.editTaskWrapper}>
              <TextInput style={styles.input}
                value={editTaskText}
                onChangeText={setEditTaskText}
              />
              <Button title="Save" onPress={handleSaveTask} />
              </KeyboardAvoidingView>
            )
      }
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.writeTaskWrapper}>
        
        <TextInput style={styles.input} placeholder="Create a new task..." value={task} onChangeText={text => setTask(text)}/>
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addtext}>Add</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 20,
  },
  writeTaskWrapper:{
    position: "absolute",
    bottom: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input:{
    paddingVertical: 15,
    width: 250,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 50,
    borderColor: "#c0c0c0",
    borderWidth: 1,
  },
  addWrapper:{
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#c0c0c0",
    borderWidth: 1,
    
  },
  addtext:{
    fontSize: 14
  },
  scrollable:{
    height: "92%"
  },
  editTaskWrapper:{
    position: "absolute",
    bottom: 24,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 1,
  },
});
