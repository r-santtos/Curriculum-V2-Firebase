import React, { useEffect, useState } from 'react';
import { 
  Alert, 
  Modal, 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Pressable,
  Linking
} from 'react-native';
import * as SecureStore from 'expo-secure-store';

import { userLoading, userModal, userTokenProfile } from '../context';

const ModalComponent: React.FC = () => {
  const { tokenProfile } = userTokenProfile();
  const { modalVisibleCV, setModalVisibleCV } = userModal();
  const { setIsLoadingToken, setLoading  } = userLoading();

  const [profile, setProfile] = useState({}) as any;
  async function apiDashboard() {
    try {
      let profile_given_name = await SecureStore.getItemAsync('profile_given_name_cv');

      let profileStore = {'profile_given_name_cv' : profile_given_name}

      setProfile(profileStore);

    } catch (error) {
      throw new Error('Erro na chamada SecureStore');
    }
  }
  useEffect(() => {apiDashboard()},[tokenProfile]);

  /** FUNCTION TOKEN */
  async function deleteSecureStore(){
    try {
      await SecureStore.deleteItemAsync('profile_email_cv');
      await SecureStore.deleteItemAsync('profile_given_name_cv');
      await SecureStore.deleteItemAsync('profile_picture_cv');

      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
      setTimeout(() => setIsLoadingToken(false), 1000);
      setModalVisibleCV(false);
    } catch {
      console.log('SecureStore erro');
    }
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleCV}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisibleCV(!modalVisibleCV);
        }}>
          <Pressable style={styles.centeredView} onPress={() => setModalVisibleCV(!modalVisibleCV)}>
            {/** ---------------------------- */}
            <View style={styles.card}>
              <Text style={[styles.txt, {fontSize: 18, paddingVertical: 16}]}>
                Olá, {profile ? profile.profile_given_name_cv : ''}!
              </Text>

              <Text style={[styles.txt, {color: 'gray'}]}>
                Para atualizar seu nome, e-mail e foto, você precisará editar as informações da sua conta do Google.
              </Text>

              <Text style={[styles.txt, {marginBottom: 16, paddingVertical: 16, color: 'gray'}]}>
                Isso é para garantir que você sempre envie seus dados atualizados e verificados pelo Google.
              </Text>

              <TouchableOpacity
                style={styles.btnMail}
                onPress={() => Linking.canOpenURL("whatsapp://send?text=oi").then(supported => {
                  if (supported) {
                    deleteSecureStore();
                    return Linking.openURL(
                      `https://myaccount.google.com/personal-info?hl=pt-br`
                    );
                  } else {
                    return Linking.openURL(
                      `whatsapp://send?phone=5599981280576&text=Ops!%20algo%20deu%20errado%2C%20envie%20essa%20msg%20para%20o%20programador%2C%20erro%20com%20a%20Error%20Google`
                    );
                  }
                })
              }>
                <Text style={[styles.txt, {textTransform: 'uppercase', color: '#0d0d10'}]}>Google</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(19,21,25,0.9)',
    paddingHorizontal: 8,
  },
  txt: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#fff'
  },

  /** CARD */
  card: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    backgroundColor: '#1b1b1e',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  /** BTN MAIL */
  btnMail: {
    height: 55,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5afa9a',
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 8
  }
});

export default ModalComponent;