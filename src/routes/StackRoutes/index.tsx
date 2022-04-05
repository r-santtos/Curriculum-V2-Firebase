import React from 'react';
import {View} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/** IMPORT ROUTES */
import Profile from '../../screens/Profile';
import Form from '../../screens/Form';

export default function Routes() {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <View style={{backgroundColor: '#0d0d10', flex: 1}}>
      <Navigator>
        <Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />

        <Screen
          name="Form"
          component={Form}
          options={{
            title: 'Forms',
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: '#1b1b1e'},
          }}
        />
      </Navigator>
    </View>
  )
}
