import { StyleSheet, Text, View } from 'react-native';
import ChattingRoom from './ChattingRoom'
import Home from './Home'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ChattingRoom" component={ChattingRoom} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

