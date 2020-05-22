import React from 'react';
import {  Text  } from 'react-native';
import Controller from '../../Controller.js'


export default function Test2() {
     Controller.instance
               .getBuses()
               .then(({data}) => data)
               .then(({Route}) => console.log(Route));
     
     return <Text>Test1</Text>
}