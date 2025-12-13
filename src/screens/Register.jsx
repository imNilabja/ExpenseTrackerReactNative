/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { TextInput } from 'react-native';
import { useState } from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';

const Register = () => {
  const navigation = useNavigation();
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [Exist, setExist] = useState(false);
    const [Eye, setEye] = useState(true)

  // const getHost = () => {
  //   if (Platform.OS === 'android') {
  //     // Android emulator -> host machine
  //     return '10.0.2.2:8080';
  //   }
  //   return 'localhost:8080';
  // };

  // const IP = getHost();
  const IP = '3.110.156.62:8080';
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
      const resp = await fetch(`http://${IP}/existingUser/${Username}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: Username,
        }),
      });

      const exist = await resp.json();

      if (!exist) {
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
      } else {
        setExist(true);
        setTimeout(() => {
          setExist(false);
        }, 2000);
      }
    } catch (err) {
      console.log('Registration error', err);
      Alert.alert('Network error', err.message || 'Request failed');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        <Image
              style={styles.icon}
              source={require('../../assets/register.png')}
              
            />
      <View style={styles.inputBox}>
        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Register</Text>
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
        <TextInput
          style={styles.textInput}
          placeholder="email"
          onChangeText={handleEmail}
          value={Email}
        />
        <TouchableOpacity onPress={handleRegister}>
          <Image
            style={styles.button}
            source={require('../../assets/sign-up.png')}
          />
        </TouchableOpacity>
        {Exist ? (
          <Text style={{ fontSize: 10, color: 'yellow' }}>User Exist!!!</Text>
        ) : null}
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
    height: '45%',
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
  icon: {
    width: 90,
    height: 90,
    marginBottom: 20,
    
  },
  button: {
    width: 80,
    height: 70,

  },
});
