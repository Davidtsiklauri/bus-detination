import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import Controller from '../../Controller.js'
import { useEffect, useState } from 'react';
import Select from '../../shared/components/Select';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Text } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';


export default function Test2() {
 

  const navigation = useNavigation();
 

  // All the buses List Hook
  const [buses, setBuses] = useState([]);

  useEffect(() => {
      getBusses(setBuses);
  }, []);
 
 // Option Select Hook
 const [value, setOptionValue] = useState('');

 //Selected Bus Object , By Select Option Hook
 const [busInfo, setBussInfo] = useState(null);

 //Loading hook
 const [isLoading, setLoader] = useState(false);

 // Update busy info
 const [busDestinitionAdresses, setBusById] = useState([]);

 // Initlize  Value for Starting point A      
 const [radio_props, setPointA] = useState([{label: '', value: 0 },{label: '', value: 0 }]);

 // Starting Bus Adress
 const [pointAValue, setPointAValue] = useState('');
 
 // Ending Bus Adress 
 const [pointB, setPointB] = useState('default');

 const [location, setLocation] = useState(null);

 // Get location
 useEffect(() => {
      (async () => {
          let { status } =  await Location.requestPermissionsAsync();
          if(status === 'granted') {
          let location = await Location.getCurrentPositionAsync({});
          const {coords}  = location;
          setLocation(coords);
       };
     })();
   }, []);

 // Get bus Routes by selected bus
 useEffect( () => {
     onOptionChange(value, location);
 }, [ value ])

 
function onOptionChange(value, location) {
     if(value === 'default') return;
     // Update Option Value
     setOptionValue(value);

     // Update selected option bus hook
     setBussInfo(buses.filter(bus => bus.RouteNumber === value)[0]);

     // fetch data by bus id 
     getBusDirectionsByBusId(value, location);
     // Loader
     setLoader(true);
 
};

function getBusses() {
     return Controller.instance
                       .getBuses()
                       .then(({data}) => data['Route'])
                       .then((Route) =>  setBuses([...Route]));
};

function getBusDirectionsByBusId(numberOfTheBus, location) {
     return Controller.instance
                       .getBusDirectionsByBusId(numberOfTheBus)
                       .then(({data}) => data)
                       .then(({RouteStops}) => {
                               setLoader(false); 
                               setBusById(removeNumbersFromRouteStopName(RouteStops));
                               handleOnSetPointA(RouteStops);
                               setBusLocation(location, RouteStops);
                            })
};

function setBusLocation(location, busStops) {     
     if(!busStops || !location) return
     let stopId = '';
     let distance = 5;

     busStops.map(
          (route) => {
               let sum = (route.Lon + route.Lat) - (+((location.longitude + location.latitude).toFixed(7)) );
               // Find Closest Locationb by sum difference 
               if( sum < distance && sum >= 0 ) {
                    distance = sum;     
                    stopId =  route.StopId;
               }
          });
          
     if(stopId) {
          setPointB(stopId);
     };
}

                                                
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

function handleOnSetPointA(routeStops) {
     if(!Array.isArray(routeStops)) return;
     setPointA([
          { 
            label: routeStops[0]['Name'], 
            value: routeStops[0]['StopId'] 
          },
          { 
             label: routeStops[routeStops.length-1]['Name'], 
             value: routeStops[routeStops.length-1]['StopId'] 
          }
      ])
};

 
function onsubmit() {
     const busNumber = value,
          pointBValue = pointB,
          pointAValue = pointAValue || radio_props[0]['value'];
          navigation.navigate('bus', {screen: 'test2' })
     if(busNumber && pointBValue && pointAValue ) {
         console.log(busNumber, pointBValue, pointAValue );
     }
}



   
return (
     <>
     <View  style={{  paddingLeft: 20, marginTop: 50 }}>
          <Text > მიუთითეთ ავტობუსის ნომერი </Text>
     </View>

     <View style={{  flexDirection: "row", height: 100, paddingLeft: 20,  paddingRight: 20, marginTop: 5 }}>
          <Select value={value} list={buses} label='RouteNumber' id='RouteNumber' 
                  onOptionChangeHook={setOptionValue} />
     </View>

     <View style={{  flexDirection: "row", flexWrap: 'wrap', justifyContent: 'center' }}>
          <Text style={{ paddingRight: 10 }}>{ busInfo && busInfo.StopA  } </Text> 
          <Text>{ busInfo &&  '-'} </Text> 
          <Text style={{ paddingLeft: 10 }}>{ busInfo && busInfo.StopB }</Text> 
     </View>
         
     <View> 
         { isLoading && <ActivityIndicator size="large" color="#00ff00" />}
     </View>     

     { busDestinitionAdresses &&  
      busDestinitionAdresses.length > 0  && 
          <View  style={{  paddingLeft: 20, marginTop: 40, marginBottom: 15 }}>
                    <Text > მიუთითეთ მარშუტი(მიმართულება) </Text>
          </View>
     }
     
     {
      busDestinitionAdresses &&  
      busDestinitionAdresses.length > 0  && 
          <View style={{  flexDirection: "row", paddingLeft: 20,  paddingRight: 20, marginTop: 5}}>
               <RadioForm
                    formHorizontal={false}
                    animation={true}
                    radio_props={radio_props}
                    onPress={ value  =>  setPointAValue(value) }>
                    <RadioButton>
                         <RadioButtonInput  isSelected='true' buttonOuterColor='true' 
                                            buttonWrapStyle={{marginLeft: 10}}/>
                         <RadioButtonLabel buttonInnerColor={'#e74c3c'} labelStyle={{fontSize: 20, color: '#2ecc71'}}/>
                    </RadioButton>

                    <RadioButton>
                         <RadioButtonInput   isSelected='true' buttonOuterColor='true' 
                                             buttonWrapStyle={{marginLeft: 10}}/>
                         <RadioButtonLabel buttonInnerColor={'#e74c3c'} labelStyle={{fontSize: 20, color: '#2ecc71'}}/>
                    </RadioButton>
               </RadioForm>
     </View>
     }

     { busDestinitionAdresses &&  
      busDestinitionAdresses.length > 0  && 
          <View  style={{  paddingLeft: 20, marginTop: 40, marginBottom: 15 }}>
                    <Text > მიუთითეთ გაჩერების მდებარეობა </Text>
          </View>
     }

     <View style={{  flexDirection: "row", height: 71, paddingLeft: 20, paddingRight: 20 }}  > 
          { busDestinitionAdresses &&  
            busDestinitionAdresses.length > 0 &&   
            <Select value={pointB} list={busDestinitionAdresses}  label='Name' 
                    id='StopId' onOptionChangeHook={setPointB} /> }
     </View> 

     {
     busDestinitionAdresses &&  
     busDestinitionAdresses.length > 0  && pointB !== 'default' && 
     <View style={{ flexDirection: "row", flexWrap: 'wrap', justifyContent: 'center' }}>
               <Button title="შემდეგი" 
                       type='solid'
                       onPress={onsubmit}/>
     </View>}

     </>
     );
};
