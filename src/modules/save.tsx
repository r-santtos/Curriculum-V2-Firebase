import * as SecureStore from 'expo-secure-store';
import { userProfile, userTokenProfile } from "../context";
import firestore from '@react-native-firebase/firestore';

function saveDatabase() {
  const { profile, setProfiles } = userProfile();
  const { tokenProfile, setTokenProfile } = userTokenProfile();

  /** MODULE SUBMIT AND PROFILE RESPONSE */
  async function profileResponse() {
    try {
      let profile_email = await SecureStore.getItemAsync('profile_email_cv');
      let profile_given_name = await SecureStore.getItemAsync('profile_given_name_cv');
      let picture = await SecureStore.getItemAsync('profile_picture_cv');

      let profileStore = {
        'profile_email_cv' : profile_email ,
        'profile_given_name_cv' : profile_given_name,
        'picture_itz': picture
      }

      setProfiles(profileStore);

    } catch (error) {
      throw new Error('Erro na chamada SecureStore');
    }
  }

  /** FUNCTION SERVER SUBMIT */
  async function submit() {
    if (profile.email !== undefined) {
      return (
        firestore()
        .collection('users')
        .doc(profile.email)
        .update({
          fullName: profile.name,
          name: profile.given_name,
          email: profile.email,
          photo: profile.picture,
          created_at: firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          save('profile_email_cv', profile.email);
          save('profile_given_name_cv', profile.given_name);
          save('profile_picture_cv', profile.picture);
          console.log('update');
        })
        .catch(() => {
          firestore()
          .collection('users')
          .doc(profile.email)
          .set({
            fullName: profile.name,
            name: profile.given_name,
            email: profile.email,
            photo: profile.picture,
            experience: [],
            formation: [],
            courses: [],
            created_at: firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            save('profile_email_cv', profile.email);
            save('profile_given_name_cv', profile.given_name);
            save('profile_picture_cv', profile.picture);
            console.log('update');
          })
          .catch(() => {
            console.log('Erro ao atualizar usuário');
          })
          .finally(() => {
            profileResponse();
          })
        })
        .finally(() => {
          profileResponse();
        })
      )
    }
  }
  
  /** FUNCTION TOKEN */
  async function save(key:string, value:string){
    try {
      await SecureStore.setItemAsync(key, value);
      setTokenProfile(tokenProfile + 1);
    } catch {
      console.log('SecureStore erro');
    }
  }

  return {
    submit
  }
}

export default saveDatabase;