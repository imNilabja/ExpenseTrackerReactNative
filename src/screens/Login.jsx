/* eslint-disable react-native/no-inline-styles */

import { StyleSheet, Text, View, Platform, Alert } from 'react-native';
import React, { useContext } from 'react';
import { TextInput } from 'react-native';
import { useState } from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthState from '../context/AuthState';
import AuthContext from '../context/AuthContext';
import Loading from './Loading';
const Login = () => {
  const navigation = useNavigation();
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const { Login } = useContext(AuthContext);

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
  const handleRegister = e => {
    navigation.navigate('Register');
  };
  const [loading, setLoading] = useState(false);

  const handleLogin = async e => {
    setLoading(true);
    try {
      const Response = await fetch(
        `http://${IP}/loginUser/${Username}/${Password}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userName: Username, userPassword: Password }),
        },
      );

      if (!Response.ok) {
        throw new Error(`Server responded with ${Response.status}`);
      }

      const data = await Response.json();
      console.log(data);
      if (data) {
        Login(Username);
         await AsyncStorage.setItem('UserID', Username);
        console.log('✅ Login successful, navigating to Explore.');
        setLoading(false);
        navigation.navigate('Explore');
      }
    } catch (err) {
      setLoading(false);
      console.log('Login error', err);
      Alert.alert('Network error', err.message || 'Request failed');
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <SafeAreaView style={styles.container}>
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

        <Button
          title="Login"
          color="#ce5a0dff"
          width="150"
          onPress={handleLogin}
        />
        <Text style={{ fontSize: 10 }}>
          don't have an account?
          <Text style={{ color: 'blue' }} onPress={handleRegister}>
            Register
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e23e07ff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    height: '45%',
    width: '60%',
    borderWidth: 3,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    gap: 30,
    padding: 20,
    alignItems: 'center',
  },
  textInput: {
    height: 45,
    width: '80%',
    borderWidth: 2,
    borderColor: '#ccc',
    color: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
