
  import React from 'react';
  import { NavigationContainer } from '@react-navigation/native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import { GestureHandlerRootView } from 'react-native-gesture-handler';
  import { StyleSheet } from 'react-native';
  import Login from './src/screens/Login';
  import Register from './src/screens/Register';
  import Explore from './src/screens/Explore';
import AddData from './src/screens/AddData';
import Header from './src/screens/Header';


  const Stack = createNativeStackNavigator();

  const App = () => {
    return (
      <GestureHandlerRootView style={styles.root}>
        <NavigationContainer>
                  <Header/>

          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Explore" component={Explore} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="AddData" component={AddData}  options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    );
  };

  const styles = StyleSheet.create({
    root: { flex: 1 },
  });

  export default App;

 
