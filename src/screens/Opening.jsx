import { StyleSheet, Text, View, Platform } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { useEffect, useContext, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../context/AuthContext';
const Opening = () => {
  const navigation = useNavigation();
  const { UserId } = useContext(AuthContext);
  const { Net } = useContext(AuthContext);
  const { network, noNetwork } = useContext(AuthContext);
  // const getHost = () => {
  //   if (Platform.OS === 'android') {
  //     // Android emulator -> host machine
  //     return '10.0.2.2:8080';
  //   }
  //   return 'localhost:8080';
  // };
  // const IP = getHost();
  const IP = '3.110.156.61:8080';

  const fetchWithTimeout = (url, options = {}, timeout = 10000) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), timeout)
    ),
  ]);
};
  const checkNetwork = useCallback(async () => {
    try {
      const response = await fetchWithTimeout(`http://${IP}/test`,{},10000);
      const data = await response.json(); // data = { success: true }

      if (data.success === true) {
        network(); // Net = true
      } else {
        noNetwork(); // Net = false
      }
    } catch (e) {
      noNetwork(); // Net = false
    }
  }, [network, noNetwork]);

  useEffect(() => {
    if (Net === true || Net === false) return; 
    checkNetwork(); // initial check
    const interval = setInterval(checkNetwork, 500); 
    return () => clearInterval(interval);
  }, [Net, checkNetwork]);

  
  useEffect(() => {
    if (Net === null) return; 
    if (UserId) {
      navigation.replace('Explore');
    } else if (Net === true) {
      navigation.replace('Login');
    } else {
      navigation.replace('Error');
    }
  }, [UserId, Net, navigation]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spendr</Text>
      <View style={styles.iconBox}>
        <FastImage
          style={styles.icon}
          source={require('../../assets/budgeting.gif')}
          resizeMode={FastImage.resizeMode.contain}
        />
        <FastImage
          style={styles.icon}
          source={require('../../assets/rupee.gif')}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>

      <Text style={styles.footer}>Clarity for your cash.</Text>
    </View>
  );
};

export default Opening;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e23e07ff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingVertical: 50,
  },
  icon: {
    width: 90,
    height: 90,
    borderRadius: 100,
  },
  iconBox: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 100,
    height: '12%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'black',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 35,
    marginTop: 10,
    color: 'white',
    fontFamily: Platform.select({
      ios: 'Helvetica Neue',
      android: 'Montserrat-Bold',
      default: 'System',
    }),
  },
  footer: {
    color: 'white',
    fontWeight: '600',
    marginBottom: 25,
  },
});
