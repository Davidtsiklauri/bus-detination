import React from 'react';
import {Picker} from '@react-native-community/picker';
 
export default ({ list, id, value, onOptionChangeHook, label  }) =>  {  
    return (
            <Picker style={{ height: 50, width: '100%' }} 
                    selectedValue={value}
                    onValueChange={(itemValue) => {
                         if(itemValue === 'default') return; // Prevent Selecting Default Value
                        onOptionChangeHook(itemValue)
                    }
                    }>
                  <Picker.Item   label='ამოირჩიეთ' value='default' />
                { list.map((item) =>  <Picker.Item key={item[id]} label={item[label]}  value={item[id]}/> ) }
            </Picker>
        );
};
