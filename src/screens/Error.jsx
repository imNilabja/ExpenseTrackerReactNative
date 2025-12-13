import { StyleSheet, Text, View, Platform } from 'react-native';
import React, { useContext, useEffect, useCallback } from 'react';
import FastImage from 'react-native-fast-image';
import AuthContext from '../context/AuthContext';

const Error = () => {
  // const getHost = () => {
  //   if (Platform.OS === 'android') {
  //     // Android emulator -> host machine
  //     return '10.0.2.2:8080';
  //   }
  //   return 'localhost:8080';
  // };
  // const IP = getHost();
  const IP = '3.110.156.6:8080';
  const { network,noNetwork } = useContext(AuthContext);

  const checkNetwork = useCallback(async () => {
    try {
      const response = await fetch(`http://${IP}/test`);
      const data = await response.json();

      if (data === true) {
        network();
      } else {
        console.log('cannot Connected to server');
        noNetwork()
      }
    } catch (e) {
      console.log('cannot Connected to server');
      noNetwork();
    }
  }, [IP, network,noNetwork]);

  useEffect(() => {
    checkNetwork();
  }, [checkNetwork]);

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
