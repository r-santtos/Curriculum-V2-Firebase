import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { userProfile } from "../../context";

type Props = {title: string, doIt: string, description: string};

const About: React.FC<Props> = ({title, doIt, description}) => {
  const { profiles } = userProfile();
  const [about, setAbout] = useState("");

  useEffect(() => {
    if (doIt == 'edit') {
      setAbout(description);
    }
  },[]);

  /** FUNCTION CHECKING */
  const [borderColor, setBorderColor] = useState("#0d0d10");
  const checking = () => {
    if (about == '') {
      setBorderColor("red");
      setTimeout(() => {setBorderColor('#0d0d10')},3000);
    } else {
      submit();
    }
  }

  /** FUNCTION SERVER SUBMIT */
  async function submit() {
    setLoad(true);
    if (profiles.profile_email_cv !== undefined) {
      firestore()
      .collection('users')
      .doc(profiles.profile_email_cv)
      .update({
        about: about,
      })
      .then(() => {
        saved();
      })
      .catch(() => {
        setLoad(false);
        console.log('Erro ao atualizar usuário');
      })
    }
  }

  /** ALERT SAVE */
  const [load, setLoad] = useState(false);
  const [save, setSave] = useState('');
  const saved = () => {
    setAbout('');
    setLoad(false);
    setSave('Cadastrado com sucesso.');
    setTimeout(() => {setSave('')},2000);
  }

  return (
    <View style={styles.constainer}>
      <ScrollView
        style={{width: '100%'}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.txt, {fontSize: 18}]}>
            {title}
          </Text>
        </View>

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          {/** NACIONALIDADE */}
          <View style={[styles.boxInput, {marginBottom: 16}]}>
            <TextInput
              style={[styles.input, {borderColor: borderColor}]}
              placeholder="..."
              placeholderTextColor="#272730"
              keyboardType="default"
              autoCorrect={true}
              autoCapitalize="sentences"
              numberOfLines={10}
              multiline={true}
              value={about}
              onChangeText={(text) => setAbout(text)}
            />
          </View>
        </KeyboardAvoidingView>

        <Text style={styles.txt}>{save}</Text>
      </ScrollView>

      {load == false ? 
        <TouchableOpacity style={styles.btn} onPress={() => checking()}>
          <Text style={styles.txt}>salvar</Text>
        </TouchableOpacity>
      : 
        <TouchableOpacity style={styles.btn}>
          <ActivityIndicator size="small" color="#d55e38"/>
        </TouchableOpacity>
      }

    </View>
  )
}

const styles = StyleSheet.create({
  constainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#1b1b1e',
    paddingHorizontal: 16,
  },
  txt: {
    fontWeight: "700",
    color: "#fff",
  },
  header: {
    paddingVertical: 16,
  },
  boxInput: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    textTransform: "uppercase",
    fontWeight: "700",
    color: "gray",
    fontSize: 10,
    marginBottom: 2,
    marginLeft: 1,
  },
  input: {
    width: '100%',
    minHeight: 55,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    color: '#fff',
    textAlignVertical: 'top',
  },
  btn: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0d0d10',
    elevation: 4,
    borderRadius: 8,
    marginVertical: 16,
  }
})

export default About;