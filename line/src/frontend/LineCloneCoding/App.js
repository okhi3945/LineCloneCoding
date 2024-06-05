import { StyleSheet, Text, View } from 'react-native';
import ChattingRoom from './components/ChattingRoom'
import Home from './components/Home'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './components/Register'
import Login from './components/Login'
import MainTabNavigator from './components/MainTabNavigator';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={Home} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Register" component={Register} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Login" component={Login} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Main" component={MainTabNavigator}
          options={{ headerShown: false }} />
        <Stack.Screen name="ChattingRoom" component={ChattingRoom} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



