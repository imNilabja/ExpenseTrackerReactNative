/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Color } from 'react-native/types_generated/Libraries/Animated/AnimatedExports';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
    const navigation = useNavigation();
  return (
    <View
      style={{
        height: 90,
        backgroundColor: '#e23e07ff',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 30 }}>
        Expense Tracker
      </Text>
      <TouchableOpacity
        onPress={async () => {
          await AsyncStorage.removeItem('UserID');
          navigation.navigate('Login');
        }}
        style={{ position: 'absolute', right: 20, top: 48 }}
      >
        <Text style={{ fontSize: 16, fontStyle: 'bold', Color: 'yellow' }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
