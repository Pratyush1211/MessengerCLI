import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import { LogBox } from 'react-native';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';

LogBox.ignoreLogs(['Setting a timer for a long period of time'])
const Stack= createNativeStackNavigator();

const globalScreenOptions={
 
  headerStyle:{backgroundColor:'#2C68ED',},
  headerTitleStyle:{color:'white'},
  headerTintColor:"white",
  headerLayoutPreset:'center',
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName="Login"
      screenOptions={globalScreenOptions}>
       <Stack.Screen name="Login" component={LoginScreen}  />
       <Stack.Screen name="Register" component={RegisterScreen}  />
       <Stack.Screen name="Home" component={HomeScreen}  />
       <Stack.Screen name="AddChat" component={AddChatScreen}  />
       <Stack.Screen name="Chat" component={ChatScreen}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});