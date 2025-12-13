import { StyleSheet, Text, View, Platform } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../context/AuthContext';
const Opening = () => {
  const navigation = useNavigation();
  const { UserId } = useContext(AuthContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (UserId) {
        navigation.replace('Explore');
      } else {
        navigation.replace('Login');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [UserId, navigation]);
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
