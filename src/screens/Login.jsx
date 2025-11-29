/* eslint-disable react/self-closing-comp */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native';
import { useState } from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = () => {
  const navigation = useNavigation();
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');

  const handleUsername = e => {
    setUsername(e);
  };
  const handlePassword = e => {
    setPassword(e);
  };
   const handleRegister = e => {
    navigation.navigate('Register');
  };
  return (
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

        <Button title='Login' color="#ce5a0dff" width='150'/>
        <Text style={{fontSize:10}}>don't have an account?
          <Text style={{ color:'blue'}} onPress={handleRegister}> Register</Text>
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
    height: '40%',
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
