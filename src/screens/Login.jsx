/* eslint-disable react/self-closing-comp */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native';
import { useState } from 'react';
import { Button } from 'react-native';

const Login = () => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');

  const handleUsername = e => {
    setUsername(e);
  };
  const handlePassword = e => {
    setPassword(e);
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputBox}>
        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Login</Text>
        <TextInput
          style={styles.textInput}
          placeholder="username"
          onChangeText={handleUsername}
          value={Username}
        />

        <TextInput
          style={styles.textInput}
          placeholder="password"
          onChangeText={handlePassword}
          value={Password}
        />

        <Button title='Login' color="#e9511f"/>


      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e9511f',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    height: 400,
    width: 270, // Increased width to be visible
    borderWidth: 2, // Use borderWidth (for thickness)
    borderColor: '#ccc', // Use borderColor (for color)
    borderRadius: 10, // Optional: Add rounded corners
    paddingHorizontal: 10,
    gap: 30,
    padding: 20,
    alignItems: 'center',
  },
  textInput: {
    height: 45,
    width: '80%',
    borderWidth: 2, // Use borderWidth (for thickness)
    borderColor: '#ccc',
    color: 'black',
  },
});
