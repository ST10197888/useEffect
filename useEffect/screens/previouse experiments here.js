import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Input from './Input'; // Import the Input component

const STORAGE_KEY = 'ASYNC_STORAGE_NAME_EXAMPLE';

export default function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [dispText, SetDispText] = useState('');

  // UseEffect to set the text for the counter
  useEffect(() => {
    setDispText('Effect - The count is ' + count);
  }, [count]);

  // UseEffect to load and save the name
  useEffect(() => {
    loadName();
  }, []);

  async function loadName() {
    try {
      const storedName = await AsyncStorage.getItem(STORAGE_KEY);

      if (storedName === null) return;

      // Check if the stored value is a 3-digit number before setting it
      if (/^\d{3}$/.test(storedName)) {
        setName(storedName);
      }
    } catch (e) {
      console.error('Failed to load name.');
    }
  }

  async function saveName(value) {
    // Check if the input is a 3-digit number before saving it
    if (/^\d{1,3}$/.test(value)) {
      // Ensure that the value has a minimum length of 1 and a maximum length of 3 digits
      try {
        await AsyncStorage.setItem(STORAGE_KEY, value);
        setName(value);
      } catch (e) {
        console.error('Failed to save name.');
      }
    } else {
      console.error('Input must be a number between 1 and 3 digits in length.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textDisp}>Counter</Text>
      <View style={styles.buttons}>
        <Button title="Increment" onPress={() => setCount(count + 1)} />
      </View>
      <View style={styles.buttons2}>
        <Button title='Lets See Those "Counts"'
		 onPress={() => {}}
		 />
      </View>
      <Text style={styles.textDisp}>Count: {count}</Text>
      <Text style={styles.textDisp}>{dispText}</Text>
      <Input
   		placeholder={'Type a 1 to 3-digit number!'}
        onSubmitEditing={(value) => {
          saveName(value);
        }}
      />
	  
      <Text style={styles.text}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  buttons: {
    margin: 5,
    padding: 5,
  },
  buttons2: {
    margin: 5,
    padding: 5,
  },
  textDisp: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  text: {
    padding: 15,
    backgroundColor: '#EEB',
  },
});
