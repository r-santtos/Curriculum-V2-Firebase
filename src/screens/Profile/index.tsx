import React, { useEffect } from 'react';
import { 
  View, 
  StyleSheet
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import * as SecureStore from 'expo-secure-store';
import LottieView from 'lottie-react-native';
import { userListUser, userTokenProfile } from '../../context';
import Profiles from '../../components/Profile';
import submit from "../../modules/save";
import loadingAnimation from '../../animations/loading.json';

type StackProfile = {navigation: {navigate:Function}}

/** PROFILE COMPONENT */
const Profile: React.FC<StackProfile> = ({ navigation }) => {
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

  return (
    <View style={styles.container}>
      {user.email ? 
        <Profiles navigation={{navigate: Function}} />
      :
        <LottieView
          style={{
            height: 250,
            alignSelf: 'center',
          }}
          autoPlay
          loop
          autoSize
          resizeMode="cover"
          source={loadingAnimation}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: '#0d0d10',
  },
  txt: {
    fontWeight: '700',
    color: '#fff'
  },
});

export default Profile;