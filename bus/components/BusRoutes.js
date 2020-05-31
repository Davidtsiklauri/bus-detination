import React, { useEffect, useState } from 'react';
import {  Text, View  } from 'react-native';
import Controller from '../../Controller.js'
import { ListItem } from 'react-native-elements'

export default function  BusRoutes({route}) { 
  const {  pointB } = route.params;
  const [ routes, setRoutes ] = useState([]);

  useEffect(() => {
    getBusArrivalTimes(pointB);
  },[])

  function getBusArrivalTimes(pointB) {
    return Controller.instance
                     .getBusArrivalTimes(pointB)
                     .then(({data}) => data)
                     .then(({ArrivalTime}) =>  setRoutes(ArrivalTime) );
  }

  // console.log(route, 'route');
  // console.log('$$$_$$$$$_$$$d');
     return (
          <View
            style={{  height: 100, padding: 20 }} >
            {
                routes.map((l, i) => (
                  <React.Fragment key={i}>
                    <Text style={{ marginTop: 15, marginBottom: 15 }}>{l.DestinationStopName}</Text>
                    <ListItem
                      title={l.RouteNumber}
                      subtitle={`${l.ArrivalTime} წუთი`}
                      bottomDivider
                    />
                  </React.Fragment>
                ))
              }
          </View>
        );
};