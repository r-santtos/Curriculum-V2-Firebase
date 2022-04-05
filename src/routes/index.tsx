import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import firestore from '@react-native-firebase/firestore';

import { userLoading, userListDashboard, userProfile } from '../context';

import StackRoutes  from './StackRoutes';
import SignIn from '../screens/SignIn';
import { userCount } from '../context/index';

export default function Routes() {
  const { count } = userCount();
  const { profile } = userProfile();
  const { setListDashboard } = userListDashboard();
  const { setLoading, isLoadingToken, setIsLoadingToken  } = userLoading();
  const { Navigator, Screen } = createNativeStackNavigator();

  /** VERIFICATION */
  async function isLoadingTokenUser() {
    try {
      let result = await SecureStore.getItemAsync('profile_email_itz');
      if (profile.email || result) {
        setLoading(true);

        try {
          const unsubscribe = firestore().collection("jobs")
            .orderBy("reg_date", "desc")
            // .where("status_vacancy", "==", "1")
            .onSnapshot(query => {
              const data = query.docs.map(doc => {
                return { id: doc.id, ...doc.data() };
              }) as any;
              setListDashboard(data);
              setIsLoadingToken(true);
            });
          return () => unsubscribe();
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