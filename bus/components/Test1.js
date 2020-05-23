import React from 'react';
import { Text , View, ActivityIndicator } from 'react-native';
import Controller from '../../Controller.js'
import { useEffect, useState } from 'react';
import {Picker} from '@react-native-community/picker';
import Select from '../../shared/components/Select';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';



export default function Test2() {

 
  // All the buses List Hook
  const [buses, setBuses] = useState([]);

  useEffect(() => {
      getBusses(setBuses);
  }, []);
 
 // Option Select Hook
 const [value, setOptionValue] = useState('');

 useEffect( () => {
     onOptionChange(value);
 }, [ value ])

 //Selected Bus Object , By Select Option Hook
 const [busInfo, setBussInfo] = useState(null);

 //Loading hook
 const [isLoading, setLoader] = useState(false);

 // Update busy info
 const [busDestinitionAdresses, setBusById] = useState([]);

 // Starting Bus Adress 
 const [pointA, setPointA] = useState('');

 // Ending Bus Adress 
 const [pointB, setPointB] = useState('');

 
function onOptionChange(value) {
     
     // Update Option Value
     setOptionValue(value);
     // Update selected option bus hook
     setBussInfo(buses.filter(bus => bus.RouteNumber === value)[0]);
     // fetch data by bus id 
     getBusDirectionsByBusId(value);
     // Loader
     setLoader(true);
 
};

function getBusses() {
     return Controller.instance
                       .getBuses()
                       .then(({data}) => data['Route'])
                       .then((Route) =>  setBuses([...Route]));
};

function getBusDirectionsByBusId(numberOfTheBus) {
     return Controller.instance
                       .getBusDirectionsByBusId(numberOfTheBus)
                       .then(({data}) => data)
                       .then(({RouteStops}) =>  {setLoader(false); setBusById(removeNumbersFromRouteStopName(RouteStops))});
};

function removeNumbersFromRouteStopName(routeStops) {
     if(!Array.isArray(routeStops)) return;
       return routeStops.map(
            ( route ) => {
                let names = route.Name.split('-');
                names.splice(names.length - 1, 1);
                route.Name = names.join();
                return route;
            }
       )
};

var radio_props = [
     {label: 'param1', value: 0 },
     {label: 'param2', value: 1 }
   ];

   
return (
     <>
     <View style={{  flexDirection: "row", height: 100, padding: 20 }}>
          <Select value={value} list={buses}  
                  label='RouteNumber' id='RouteNumber' 
                  onOptionChangeHook={setOptionValue} />
     </View>

     <View style={{  flexDirection: "row", flexWrap: 'wrap', justifyContent: 'center' , height: 100, padding: 20 }}>
          <Text style={{ paddingRight: 10 }}>{ busInfo && busInfo.StopA  } </Text> 
          <Text>{ busInfo &&  '-'} </Text> 
          <Text style={{ paddingLeft: 10 }}>{ busInfo && busInfo.StopB }</Text> 
     </View>
         
     <View> 
         { isLoading && <ActivityIndicator size="large" color="#00ff00" />}
     </View> 
     {/* isSelected={this.state.value3Index === i} */}
     {/* buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'} */}
     
     <View style={{  flexDirection: "row", height: 100, padding: 20 }}>
          <RadioForm
               formHorizontal={false}
               animation={true}
               radio_props={radio_props}
               onPress={(value) =>  console.log(radio_props)}>
                    
               <RadioButton labelHorizontal={false}  >
                    <RadioButtonInput   borderWidth={1} buttonInnerColor={'#e74c3c'} 
                                        buttonSize={20} buttonOuterSize={30} buttonStyle={{}} 
                                        isSelected='true'
                                        buttonOuterColor='true'
                         buttonWrapStyle={{marginLeft: 10}}
                    />
                    <RadioButtonLabel labelStyle={{fontSize: 20, color: '#2ecc71'}} labelWrapStyle={{}}/>
               </RadioButton>

               <RadioButton labelHorizontal={false}  >
                    <RadioButtonInput  
                         borderWidth={1} buttonInnerColor={'#e74c3c'} 
                         buttonSize={20} buttonOuterSize={30} buttonStyle={{}} 
                         isSelected='true'
                         buttonOuterColor='true'
                         buttonWrapStyle={{marginLeft: 10}}
                    />
                    <RadioButtonLabel labelHorizontal={true} labelStyle={{fontSize: 20, color: '#2ecc71'}} labelWrapStyle={{}}/>
               </RadioButton>
          </RadioForm>
     </View>

     <View style={{  flexDirection: "row", height: 71, paddingLeft: 20, paddingRight: 20 }}  > 
          { busDestinitionAdresses &&  
            busDestinitionAdresses.length > 0 &&   <Select value={pointB} list={busDestinitionAdresses}  label='Name' 
                                                           id='StopId' onOptionChangeHook={setPointB} /> }
     </View> 

     </>
     );
};
