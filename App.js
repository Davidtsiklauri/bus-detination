import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  Bus  from './bus/BusMain';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="bus"> 
          <Stack.Screen name="bus" component={Bus} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

 