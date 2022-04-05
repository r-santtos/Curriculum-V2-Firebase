import * as SecureStore from 'expo-secure-store';
import React, { useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  StatusBar
} from 'react-native';

/** IMPORT USER */
import signIn from "../../modules/signIn";
import { userLoading, userProfile } from '../../context';

type StackSignIn = {navigation: {navigate:Function}}

const SignIn: React.FC<StackSignIn> = ({navigation}) => {
  const socialLogin = signIn();
  const {setProfiles} = userProfile();
  const { loading } = userLoading();

  /** MODULE SUBMIT AND PROFILE RESPONSE */
  async function profileResponse() {
    try {
      let profile_email = await SecureStore.getItemAsync('profile_email_itz');
      let profile_given_name = await SecureStore.getItemAsync('profile_given_name_itz');
      let picture = await SecureStore.getItemAsync('profile_picture_itz');

      let profileStore = {
        'profile_email_itz' : profile_email ,
        'profile_given_name_itz' : profile_given_name,
        'picture_itz': picture
      }

      setProfiles(profileStore);

    } catch (error) {
      throw new Error('Erro na chamada SecureStore');
    }
  }
  useEffect(() => {profileResponse()}, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.boxLogo}></View>

        <View style={{flex: 1, width: '100%', justifyContent: 'center'}}>
          <Text style={styles.titleH1}>
            Vagas de{"\n"}
            <Text style={{color: '#5afa9a'}}>Empregos</Text>{"\n"}
            Imperatriz{"\n"}
            Maranhão
          </Text>

          <Text style={styles.titleH2}>
            Encontre o emprego perfeito para você e com apenas um clique envie seu currículo
          </Text>
        </View>

        <View style={{width: '100%',height: '25%', justifyContent: 'center'}}>
          {loading == true ? (
            <ActivityIndicator size="large" color="#5afa9a"/>
          ) : (
            <TouchableOpacity 
              style={[styles.btn, {flexDirection: 'row'}]} 
              onPress={() => socialLogin.handleSignInGoogle()}
            >
              <Text style={{color: '#0d0d10', fontWeight: 'bold', fontSize: 20}}>Google</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={[styles.ball, styles.ballOne]}/>
        <View style={[styles.ball, styles.ballOnes]}/>
        <View style={[styles.ball, styles.ballTwo]}/>
        <View style={[styles.ball, styles.ballThree]}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: '#0d0d10',
    paddingHorizontal: 8,
  },
  boxLogo: {
    width: '100%', 
    height: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleH1: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  titleH2: {
    fontSize: 16,
    fontWeight: '700',
    color: 'gray'
  },
  btn: {
    width: '100%',
    height: 55,
    backgroundColor: '#5afa9a',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 75/2,
    zIndex: 2
  },
  /** BALLS */
  ball: {
    position: 'absolute',
    backgroundColor: '#5afa9a',
    zIndex: 1,
    borderRadius: 200,
  },
  ballOne: {
    width: 350,
    height: 350,
    top: 200,
    right: -200,
    opacity: 0.1,
  },
  ballOnes: {
    width: 100,
    height: 200,
    top: -50,
    right: -30,
    opacity: 0.2,
    backgroundColor: '#5afa9a',

  },
  ballTwo: {
    width: 600,
    height: 400,
    opacity: 0.1,
    top: -200,
    left: -400,
  },
  ballThree: {
    width: 100,
    height: 250,
    opacity: 0.1,
    bottom: -75,
    left: 10,
  },
});

export default SignIn;