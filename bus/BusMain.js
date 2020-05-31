import React from 'react'
import SelectBusInformation from './components/SelectBusInformation';
import BusRoutes from './components/BusRoutes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {  Button  } from 'react-native';
import { useNavigation } from '@react-navigation/native';

 

export default function BusMain() {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();

     return (
          <>
            <Tab.Navigator screenOptions={{ tabBarVisible: false }} initialRouteName="select-bus"> 
                <Tab.Screen name="select-bus" component={SelectBusInformation} />
                <Tab.Screen name="routes" component={BusRoutes} />
            </Tab.Navigator>
            <Button
               title="test1"
               onPress={() =>  navigation.navigate('bus', { screen: 'select-bus' })}
             />
             <Button
               title="test2"
               onPress={() => navigation.navigate('bus', {screen: 'routes' })}
             />
          </>
     );
};