import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Explore from './src/screens/Explore';
import AddData from './src/screens/AddData';
import Header from './src/screens/Header';
import AuthState from './src/context/AuthState';
import AuthContext from './src/context/AuthContext';
import Opening from './src/screens/Opening';
import Error from './src/screens/Error';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();
const AppScreen = () => {
  const { UserId, Net } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Toast />
      <Stack.Navigator>
        {UserId ? (
          <>
            <Stack.Screen
              name="Explore"
              component={Explore}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="AddData"
              component={AddData}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Opening"
              component={Opening}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Error"
              component={Error}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const App = () => {
  return (
    <GestureHandlerRootView style={styles.root}>
      <AuthState>
        <AppScreen />
      </AuthState>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
});

export default App;
