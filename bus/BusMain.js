import React from 'react'
import Test1 from './components/Test1';
import Test2 from './components/Test2';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {  Button  } from 'react-native';
import { useNavigation } from '@react-navigation/native';

 

export default function BusMain() {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();

     return (
          <>
            <Tab.Navigator screenOptions={{ tabBarVisible: false }} initialRouteName="test1"> 
                <Tab.Screen name="test1" component={Test1} />
                <Tab.Screen name="test2" component={Test2} />
            </Tab.Navigator>
            <Button
               title="test1"
               onPress={() =>  navigation.navigate('bus', {screen: 'test1' })}
             />
             <Button
               title="test2"
               onPress={() => navigation.navigate('bus', {screen: 'test2' })}
             />
          </>
     );
};