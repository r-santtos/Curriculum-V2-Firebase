import React, { useEffect, useState } from 'react';
import { 
  Alert, 
  Modal, 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Pressable
} from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import * as SecureStore from 'expo-secure-store';

import { userModal, userTokenProfile } from '../context';

const ModalComponent: React.FC = () => {
  const { tokenProfile } = userTokenProfile();
  const { modalVisible, setModalVisible } = userModal();

  const [profile, setProfile] = useState({}) as any;
  async function apiDashboard() {
    try {
      let profile_given_name = await SecureStore.getItemAsync('profile_given_name_itz');

      let profileStore = {'profile_given_name_itz' : profile_given_name}

      setProfile(profileStore);

    } catch (error) {
      throw new Error('Erro na chamada SecureStore');
    }
  }
  useEffect(() => {apiDashboard()},[tokenProfile]);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
          <Pressable style={styles.centeredView} onPress={() => setModalVisible(!modalVisible)}>
            {/** ---------------------------- */}
            <View style={styles.card}>
              <Text style={[styles.txt, {fontSize: 18, paddingVertical: 16}]}>
                Olá, {profile ? profile.profile_given_name_itz : ''}!
              </Text>

              <Text style={[styles.txt, {color: 'gray'}]}>
                Este aplicativo é voltado para a comunidade local, as vagas ofertadas são exclusivas para a cidade de Imperatriz-ma
              </Text>

              <Text style={[styles.txt, {paddingVertical: 16, color: 'gray'}]}>
                Se você souber de alguma vaga em aberto que não esteja no aplicativo e quiser ajudar a comunidade, é só clicar no botão abaixo.
              </Text>

              <Text style={[styles.txt, {marginBottom: 16, color: 'gray'}]}>
                Lembrando também, se você clicar na sua foto de perfil encontrará a opção de imprimir o PDF do seu currículo.
              </Text>

              <TouchableOpacity
                style={styles.btnMail}
                onPress={() => {
                  MailComposer.composeAsync({
                    recipients:
                    ['email.rsanttos@gmail.com'],
                    subject: 'Indicar uma vaga',
                    body: '',
                  });
                }}
              >
                <Text style={[styles.txt, {textTransform: 'uppercase', color: '#0d0d10'}]}>indicar</Text>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(19,21,25,0.8)',
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
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
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
    borderRadius: 8,
    elevation: 8
  }
});

export default ModalComponent;