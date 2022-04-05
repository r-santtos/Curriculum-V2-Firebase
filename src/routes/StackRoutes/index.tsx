import React, { useEffect } from 'react';
import {View} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';
import * as SecureStore from 'expo-secure-store';

import submit from "../../modules/save";

/** IMPORT ROUTES */
import Profile from '../../screens/Profile';
import Form from '../../screens/Form';
import Splash from '../../components/Splash';

import { userListUser, userTokenProfile } from '../../context';

export default function Routes() {
  const { user, setUser } = userListUser();
  const firebaseServer = () => {  
    async function userProfileFirebase() {
      let result = await SecureStore.getItemAsync('profile_email_cv');
      if (result) {
        const unsubscribe = firestore()
        .collection('users')
        .doc(result)
        .onSnapshot(async (doc) => {
          if (doc.exists) {
            const data = doc.data();
            setUser(data);
          } else {
            console.log('No such document!');
          }
          return () => unsubscribe();
        });
      }
    }
  
    return {
      userProfileFirebase,
    }
  }

  /** CALL PROFILE FIREBASE CV */
  const { tokenProfile } = userTokenProfile();
  const server = firebaseServer();
  useEffect(() => {server.userProfileFirebase()} ,[tokenProfile])

  /** SAVE DATABASE FIREBASE */
  const saveSubmit = submit();
  const saveDatabaseApi = async () => {
    let profile_email = await SecureStore.getItemAsync('profile_email_cv');
    try {
      if (!profile_email) {
        saveSubmit.submit();
        console.log(profile_email)
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {saveDatabaseApi()}, []);

  const { Navigator, Screen } = createNativeStackNavigator();
  return (
    <View style={{backgroundColor: '#0d0d10', flex: 1}}>
      <Navigator>
        {user.email ? 
          <Screen
            name="Profile"
            component={Profile}
            options={{headerShown: false}}
          />
        :
          <Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />
        }

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
