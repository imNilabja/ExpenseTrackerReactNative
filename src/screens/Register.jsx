/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View, Platform, Alert } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native';
import { useState } from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Register = () => {
  const navigation = useNavigation();
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  
  // const getHost = () => {
  //   if (Platform.OS === 'android') {
  //     // Android emulator -> host machine
  //     return '10.0.2.2:8080';
  //   }
  //   return 'localhost:8080';
  // };

  // const IP = getHost();
const IP = "13.127.135.62:8080";
  const handleUsername = e => {
    setUsername(e);
  };
  const handlePassword = e => {
    setPassword(e);
  };
  const handleEmail = e => {
    setEmail(e);
  };
  const handleLogin = e => {
    navigation.navigate('Login');
  };

  const handleRegister = async () => {
    try {
      const Response = await fetch(`http://${IP}/addUser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: Username,
          userPassword: Password,
          userEmail: Email,
        }),
      });

      setEmail('');
      setPassword('');
      setUsername('');
      navigation.navigate('Login');
    } catch (err) {
      console.log('Registration error', err);
      Alert.alert('Network error', err.message || 'Request failed');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputBox}>
        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Register</Text>
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
          password
        />

        <TextInput
          style={styles.textInput}
          placeholder="email"
          onChangeText={handleEmail}
          value={Email}
        />

        <Button
          title="Register"
          color="#ce5a0dff"
          width="150"
          onPress={handleRegister}
        />
        <Text style={{ fontSize: 10 }}>
          Already have an account?
          <Text style={{ color: 'blue' }} onPress={handleLogin}>
            Login
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e23e07ff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    height: '40%',
    width: '60%',
    borderWidth: 3,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    gap: 20,
    padding: 20,
    alignItems: 'center',
  },
  textInput: {
    height: 42,
    width: '80%',
    borderWidth: 2,
    borderColor: '#ccc',
    color: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
