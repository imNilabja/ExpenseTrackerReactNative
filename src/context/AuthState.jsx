import AuthContext from './AuthContext';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const AuthState = props => {
  const [UserId, setUserId] = useState('');
  const [Net, setNet] = useState(null);
  const [Time, setTime] = useState(null);
  const Login = async user => {
    setUserId(user);
    //   await AsyncStorage.setItem("userId",UserId);
  };

  const LogOut = async () => {
    setUserId(null);
    //   await AsyncStorage.removeItem("userId");
  };

  const network = () => {
    setNet(true);
  };
  const noNetwork = () => {
    setNet(false);
  };

  const handleLastUpdateTime = async () => {
    const date = new Date();

    const timeValue = date.toString().split('GMT')[0].trim();
    setTime(timeValue);
    await AsyncStorage.setItem('timeStamp', timeValue);
    // Alert.alert(timeValue)
  };

  return (
    <AuthContext.Provider
      value={{
        UserId,
        Login,
        LogOut,
        network,
        Net,
        noNetwork,
        handleLastUpdateTime,
        Time,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
