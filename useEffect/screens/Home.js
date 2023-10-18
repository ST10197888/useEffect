import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Input from './Input';
import CounterScreen from './CounterScreen';

const STORAGE_KEY = 'ASYNC_STORAGE_NAME_EXAMPLE';

function Screen1({ navigation }) {
  return (
    <View style={styles.buttons}>
      <Text>DisplayScreen</Text>
      <Button
        title="Go to CounterScreen"
        onPress={() => navigation.navigate('./screens/CounterScreen')}
      />
    </View>
  );
}

export default function App() {
  const [name, setName] = useState(''); //before was Initialized with three zeros but still worked when blank :)
	const [dispText, SetDispText] = useState('');
  
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
      // Ensure that the value has a minimum length of 1 and a maximum length of 3 digits, {kenny note have to read more on java to understand this script/function}
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

  useEffect(() => {
    loadName();
  }, []);

  return (
    <View style={styles.container}>
      <Input
        placeholder={'Type a 1 to 3-digit number!'}
        onSubmitEditing={(value) => {
          saveName(value);
        }}
        keyboardType="number-pad" // Wsa suppose to set the keyboard  to a number-pad but didnt work...
      />
      <Text style={styles.text}>     {name}     </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    padding: 15,
    backgroundColor: '#EEB',
  },
  	buttons: {
		margin: 5,
		padding: 5,
	},
});

