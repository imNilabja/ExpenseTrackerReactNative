  import { StyleSheet, Text, View } from 'react-native';
  import React from 'react';
  import { NavigationContainer } from '@react-navigation/native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import Login from './src/screens/Login';
  import Register from './src/screens/Register';
  import Explore from './src/screens/Explore';

  const App = () => {
    const Stack = createNativeStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Explore" component={Explore} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  export default App;

  // const styles = StyleSheet.create({});
