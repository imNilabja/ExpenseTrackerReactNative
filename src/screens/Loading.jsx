import { StyleSheet, Text, View, Image } from 'react-native';
import FastImage from 'react-native-fast-image';

import React from 'react';
import { Button } from 'react-native/types_generated/index';

const Loading = () => {
  return (
    <View style={styles.container}>
      <FastImage
        style={styles.icon}
        source={require('../../assets/download.gif')}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e23e07ff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 70,
    height: 70,
    borderRadius: 100,
  
  },
});
