import firestore from '@react-native-firebase/firestore';
import React, { useRef, useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { userProfile } from '../../context';

type Props = {title: string, names: string, keyArray: string};

const ExperienceCourses: React.FC<Props> = ({title, names, keyArray}) => {
  const { profiles } = userProfile();

  const [inputCourses, setInputCourses] = useState("");
  const [inputInstitution, setInputInstitution] = useState("");
  const [inputPeriodStart, setInputPeriodStart] = useState("");
  const [inputPeriodFinish, setInputPeriodFinish] = useState("");

  /** USEREF */
  const institution:React.MutableRefObject<any> = useRef();
  const periodStart:React.MutableRefObject<any> = useRef();
  const periodFinish:React.MutableRefObject<any> = useRef();

  /** FUNCTION CHECKING */
  const [borderColorCourses, setBorderColorCourses] = useState("#0d0d10");
  const [borderColorInstitution, setBorderColorInstitution] = useState("#0d0d10");
  const [borderColorPeriodStart, setBorderColorPeriodStart] = useState("#0d0d10");
  const [borderColorPeriodFinish, setBorderColorPeriodFinish] = useState("#0d0d10");

  const checking = () => {
    if (inputCourses == '') {
      setBorderColorCourses("red");
      setTimeout(() => {setBorderColorCourses('#0d0d10')},3000);
    } else {
      if (inputInstitution == '') {
        setBorderColorInstitution("red");
        setTimeout(() => {setBorderColorInstitution('#0d0d10')},3000);
      } else {
        if (inputPeriodStart == '') {
          setBorderColorPeriodStart("red");
          setTimeout(() => {setBorderColorPeriodStart('#0d0d10')},3000);
        } else {
          if (inputPeriodFinish == '') {
            setBorderColorPeriodFinish("red");
            setTimeout(() => {setBorderColorPeriodFinish('#0d0d10')},3000);
          } else {
            verificationSubmit(keyArray);
          }
        }
      }
    }
  }

  /** FUNCTION SERVER SUBMIT */
  const verificationSubmit = (keyArray: string) => {
    switch (keyArray) {
      case 'experience':
        submitExperience();
        break;

      case 'courses':
        submitCourses();
        break;

      case 'formation': 
        submitFormation();
        break;
    
      default:
        break;
    }
  }

  async function submitExperience() {
    setLoad(true);
    if (profiles.profile_email_itz !== undefined) {
      firestore()
      .collection('users')
      .doc(profiles.profile_email_itz)
      .update({
        experience: firestore.FieldValue.arrayUnion({
          vacancy: inputCourses,
          institution: inputInstitution,
          periodStart: inputPeriodStart,
          periodFinish: inputPeriodFinish
        })
      })
      .then(() => {
        saved();
      })
      .catch(() => {
        setLoad(false);
        console.log('Erro ao atualizar usuário');
      })
      .finally(() => {
        setInputCourses("");
        setInputInstitution("");
        setInputPeriodStart("");
        setInputPeriodFinish("");
      })
    }
  }

  async function submitCourses() {
    setLoad(true);
    if (profiles.profile_email_itz !== undefined) {
      firestore()
      .collection('users')
      .doc(profiles.profile_email_itz)
      .update({
        courses: firestore.FieldValue.arrayUnion({
          courses: inputCourses,
          institution: inputInstitution,
          periodStart: inputPeriodStart,
          periodFinish: inputPeriodFinish
        })
      })
      .then(() => {
        saved();
      })
      .catch(() => {
        setLoad(false);
        console.log('Erro ao atualizar usuário');
      })
      .finally(() => {
        setInputCourses("");
        setInputInstitution("");
        setInputPeriodStart("");
        setInputPeriodFinish("");
      })
    }
  }

  async function submitFormation() {
    setLoad(true);
    if (profiles.profile_email_itz !== undefined) {
      firestore()
      .collection('users')
      .doc(profiles.profile_email_itz)
      .update({
        formation: firestore.FieldValue.arrayUnion({
          courses: inputCourses,
          institution: inputInstitution,
          periodStart: inputPeriodStart,
          periodFinish: inputPeriodFinish
        })
      })
      .then(() => {
        saved();
      })
      .catch(() => {
        setLoad(false);
        console.log('Erro ao atualizar usuário');
      })
      .finally(() => {
        setInputCourses("");
        setInputInstitution("");
        setInputPeriodStart("");
        setInputPeriodFinish("");
      })
    }
  }
  
  /** ALERT SAVE */
  const [load, setLoad] = useState(false);
  const [save, setSave] = useState('');
  const saved = () => {
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
          {/** NOME DO CURSO */}
          <View style={[styles.boxInput, {marginBottom: 16}]}>
            <Text style={styles.label}>{names}</Text>
            <TextInput
              style={[styles.input, {borderColor: borderColorCourses}]}
              placeholder="..."
              placeholderTextColor="#272730"
              keyboardType="default"
              autoCorrect={true}
              autoCapitalize="sentences"
              value={inputCourses}
              onChangeText={(text) => setInputCourses(text)}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => (institution.current && institution.current.focus())}
            />
          </View>

          {/** NOME DA INSTITUIÇÃO */}
          <View style={[styles.boxInput, {marginBottom: 16}]}>
            <Text style={styles.label}>Nome da Instituição</Text>
            <TextInput
              style={[styles.input, {borderColor: borderColorInstitution}]}
              placeholder="..."
              placeholderTextColor="#272730"
              keyboardType="default"
              autoCorrect={true}
              autoCapitalize="sentences"
              value={inputInstitution}
              onChangeText={(text) => setInputInstitution(text)}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => (periodStart.current && periodStart.current.focus())}
              ref={institution}
            />
          </View>

          {/** ANO DE INICIO E FIM */}
          <View style={[styles.row, {marginBottom: 16}]}>
            <View style={[styles.boxInput, {width: '48.5%'}]}>
              <Text style={styles.label}>Ano de Início</Text>
              <TextInput
                style={[styles.input, {borderColor: borderColorPeriodStart}]}
                placeholder="..."
                placeholderTextColor="#272730"
                keyboardType="number-pad"
                autoCorrect={false}
                autoCapitalize="sentences"
                value={inputPeriodStart}
                onChangeText={(text) => setInputPeriodStart(text)}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => (periodFinish.current && periodFinish.current.focus())}
                ref={periodStart}
              />
            </View>

            <View style={[styles.boxInput, {width: '48.5%'}]}>
              <Text style={styles.label}>Ano de Saída</Text>
              <TextInput
                style={[styles.input, {borderColor: borderColorPeriodFinish}]}
                placeholder="..."
                placeholderTextColor="#272730"
                keyboardType="number-pad"
                autoCorrect={false}
                autoCapitalize="sentences"
                value={inputPeriodFinish}
                onChangeText={(text) => setInputPeriodFinish(text)}
                returnKeyType="send"
                onSubmitEditing={() => checking()}
                ref={periodFinish}
              />
            </View>
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
          <ActivityIndicator size="small" color="#5afa9a"/>
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
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    color: '#fff',
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

export default ExperienceCourses;