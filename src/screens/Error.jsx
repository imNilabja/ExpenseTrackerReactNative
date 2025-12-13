import { StyleSheet, Text, View, Platform } from 'react-native';
import React, { useContext, useEffect, useCallback } from 'react';
import FastImage from 'react-native-fast-image';
import AuthContext from '../context/AuthContext';

const Error = () => {

  

  return (
    <View style={styles.container}>
      <FastImage
        style={styles.icon}
        source={require('../../assets/nointernet.gif')}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text
        style={{
          marginTop: 20,
          fontWeight: '700',
          fontSize: 20,
          color: '#f5972c',
          width: '50%',
          textAlign: 'center',
          alignSelf: 'center',
        }}
      >
        DISCONNECTED SERVER CANNOT BE REACHED
      </Text>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e23e07ff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  icon: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: 'black',
  },
});
