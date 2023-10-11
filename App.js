import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems,task])
    //console.log(task)
    setTask(null);
  }

  

  return (
    <View style={styles.container}>
      {/* Today's Task */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <View style={styles.items}>
          {/* Tasks */}
          {
            taskItems.map((item, index) => {
              return <Task key={index} text={item} />
            })
          }
          {/* <Task text={"Task 1"}/>
          <Task text={"Task 2"}/> */}
        </View>
      </View>
      {/* Create a Task */}
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.writeTaskWrapper}>
        <TextInput style={styles.input} placeholder="Create a new task..." value={task} onChangeText={text => setTask(text)}/>
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addtext}>+</Text>
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
    bottom: 60,
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
    fontSize: 34
  },
});
