/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../context/AuthContext';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = () => {
  const navigation = useNavigation();
  const { LogOut } = useContext(AuthContext);
  return (
    <View
      style={{
        height: 90,
        width: '100%',
        backgroundColor: '#e23e07ff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 10,
      }}
    >
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 30,color:'white' }}>
        Expense Tracker
      </Text>
      <TouchableOpacity
        onPress={async () => {
          LogOut();
          await AsyncStorage.removeItem('UserID');
          navigation.navigate('Login');
        }}
        style={{ position: 'absolute', right: 20, top: 48 }}
      >
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'yellow', }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
