/* eslint-disable react-native/no-inline-styles */

import {
  StyleSheet,
  Text,
  View,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
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
import Toast from 'react-native-toast-message';
import { Image } from 'react-native';

const Login = () => {
  const navigation = useNavigation();
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const { Login } = useContext(AuthContext);
  const [Eye, setEye] = useState(true)

  // const getHost = () => {

  //   if (Platform.OS === 'android') {
  //     // Android emulator -> host machine
  //     return '10.0.2.2:8080';
  //   }
  //   return 'localhost:8080';
  // };

  // const IP = getHost();

  const IP = '43.204.103.88:8080';

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
  const [Exist, setExist] = useState(false);

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
      const data = await Response.json();
      if (!data) {
        setLoading(false);
        setExist(true);

        setTimeout(() => {
          setExist(false);
        }, 3000);
        return;
        // navigation.navigate('Register');
      }

      console.log(data);
      if (data) {
        Login(Username);
        await AsyncStorage.setItem('UserID', Username);
        console.log('✅ Login successful, navigating to Explore.');
        Toast.show({
          type: 'success',
          text1: 'Logged in successfully!',
        });
        setLoading(false);
        setTimeout(() => {
          navigation.navigate('Explore');
        }, 700);
      }
    } catch (err) {
      setLoading(false);

      console.log('Login error', err);

      Alert.alert('Netwom rk error', err.message || 'Request failed');
    }
  };




  return loading ? (
    <Loading />
  ) : (
    <SafeAreaView style={styles.container}>
      <Image style={styles.icon} source={require('../../assets/profile.png')} />
      <View style={styles.inputBox}>
        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Login</Text>
        <TextInput
          style={styles.textInput}
          placeholder="username"
          onChangeText={handleUsername}
          value={Username}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <TextInput
            secureTextEntry={Eye}
            style={[styles.textInput, { paddingRight: '35' }]}
            placeholder="password"
            onChangeText={handlePassword}
            value={Password}
          />
        { Eye?( <TouchableOpacity style={{  position: 'absolute',right: '10',}} onPress={()=>{setEye(false)}}>
            <Image
              style={{
                height: 20,
                width: 20,
              
              }}
              source={require('../../assets/open_eye.png')}
            />
          </TouchableOpacity>):(
             <TouchableOpacity style={{  position: 'absolute',right: '10',}} onPress={()=>{setEye(true)}}>
            <Image
              style={{
                height: 20,
                width: 20,
              
              }}
              source={require('../../assets/hidden_eye.png')}
            />
          </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity onPress={handleLogin}>
          <Image
            style={styles.button}
            source={require('../../assets/login_button.png')}
          />
        </TouchableOpacity>

        {Exist ? (
          <Text style={{ fontSize: 12, color: 'yellow' }}>
            user doesn't exist!!!
          </Text>
        ) : null}

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
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  button: {
    width: 80,
    height: 70,
    marginBottom: 10,
  },
});
