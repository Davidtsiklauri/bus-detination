import React from 'react';
import { Text , View, ActivityIndicator } from 'react-native';
import Controller from '../../Controller.js'
import { useEffect, useState } from 'react';
import {Picker} from '@react-native-community/picker';
 

export default ({ list, id, value, onOptionChangeHook, label  }) =>  {  
    // console.log(list);
    return (
            <Picker style={{ height: 50, width: '100%' }} 
                    selectedValue={value}
                    onValueChange={(itemValue) =>
                        onOptionChangeHook(itemValue)
                    }>
                { list.map((item) =>  <Picker.Item key={item[id]} label={item[label]}  value={item[id]}/> ) }
            </Picker>
        );
};
