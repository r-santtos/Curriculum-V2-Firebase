import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

import { userLoading, userProfile } from '../context';

import StackRoutes  from './StackRoutes';
import SignIn from '../screens/SignIn';
import { userCount } from '../context/index';

export default function Routes() {
  const { count } = userCount();
  const { profile } = userProfile();
  const { setLoading, isLoadingToken, setIsLoadingToken  } = userLoading();
  const { Navigator, Screen } = createNativeStackNavigator();

  /** VERIFICATION */
  async function isLoadingTokenUser() {
    try {
      let result = await SecureStore.getItemAsync('profile_email_cv');
      if (profile.email || result) {
        setLoading(true);
        try {
          setIsLoadingToken(true);
        } catch (error) {
          console.log(error);
        }
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.warn(e);
    }
  }
  useEffect(() => {isLoadingTokenUser()}, [count]);

  return (
    <NavigationContainer>
      {isLoadingToken == true ? (
        <StackRoutes />
      ) : (
        <Navigator>
          <Screen
            name="SignIn"
            component={SignIn}
            options={{headerShown: false}}
          />
        </Navigator>
      )}
    </NavigationContainer>
  )
}