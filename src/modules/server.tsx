import firestore from '@react-native-firebase/firestore';
import * as SecureStore from 'expo-secure-store';
import { userListUser } from '../context';

const firebaseServer = () => {
  const { setUser } = userListUser();

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

export default firebaseServer;