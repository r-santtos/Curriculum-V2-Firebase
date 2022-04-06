import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useRef, useState } from "react";
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

type ObjPessonal = {
  "age": string,
  "city": string,
  "ddd": string,
  "marital_status": string,
  "nationality": string,
  "neighborhood": string,
  "phone": string,
  "state": string,
  "street": string,
  "street_number": string,
}

type Props = {title: string, data: ObjPessonal, doIt: string};

const PersonalData: React.FC<Props> = ({title, data, doIt}) => {
  const { profiles } = userProfile();

  const [inputNationality, setNationality] = useState('');
  const [inputMaritalStatus, setInputMaritalStatus] = useState('');
  const [inputAge, setInputAge] = useState('');
  const [inputCity, setInputCity] = useState('');
  const [inputStreet, setInputStreet] = useState('');
  const [inputStreetNumber, setInputStreetNumber] = useState('');
  const [inputNeighborhood, setInputNeighborhood] = useState('');
  const [inputState, setInputState] = useState('');
  const [inputDDD, setInputDDD] = useState('');
  const [inputPhone, setInputPhone] = useState('');

  /** FUNCTION CHECKING */
  const [borderColorNationality, setBorderColorNationality] = useState("#0d0d10");
  const [borderColorMaritalStatus, setBorderColorMaritalStatus] = useState("#0d0d10");
  const [borderColorAge, setBorderColorAge] = useState("#0d0d10");
  const [borderColorCity, setBorderColorCity] = useState("#0d0d10");
  const [borderStreet, setBorderStreet] = useState("#0d0d10");
  const [borderColorStreetNumber, setBorderColorStreetNumber] = useState("#0d0d10");
  const [borderColorNeighborhood, setBorderColorNeighborhood] = useState("#0d0d10");
  const [borderColorState, setBorderColorState] = useState("#0d0d10");
  const [borderColorDDD, setBorderColorDDD] = useState("#0d0d10");
  const [borderColorPhone, setBorderColorPhone] = useState("#0d0d10");

  /** USEREF */
  const maritalStatus:React.MutableRefObject<any> = useRef();
  const age:React.MutableRefObject<any> = useRef();
  const city:React.MutableRefObject<any> = useRef();
  const stateCity:React.MutableRefObject<any> = useRef();
  const street:React.MutableRefObject<any> = useRef();
  const streetNumber:React.MutableRefObject<any> = useRef();
  const neighborhood:React.MutableRefObject<any> = useRef();
  const ddd:React.MutableRefObject<any> = useRef();
  const phone:React.MutableRefObject<any> = useRef();
  
  useEffect(() => {
    if (doIt == 'edit') {
      setNationality(data.nationality);
      setInputMaritalStatus(data.marital_status);
      setInputAge(data.age);
      setInputCity(data.city);
      setInputStreet(data.street);
      setInputStreetNumber(data.street_number);
      setInputNeighborhood(data.neighborhood);
      setInputState(data.state);
      setInputDDD(data.ddd);
      setInputPhone(data.phone);
    }
  },[]);

  const checking = () => {
    if (inputNationality == '') {
      setBorderColorNationality("red");
      setTimeout(() => {setBorderColorNationality('#0d0d10')},3000);
    } else {
      if (inputMaritalStatus == '') {
        setBorderColorMaritalStatus("red");
        setTimeout(() => {setBorderColorMaritalStatus('#0d0d10')},3000);
      } else {
        if (inputAge == '') {
          setBorderColorAge("red");
          setTimeout(() => {setBorderColorAge('#0d0d10')},3000);
        } else {
          if (inputCity == '') {
            setBorderColorCity("red");
            setTimeout(() => {setBorderColorCity('#0d0d10')},3000);
          } else {
            if (inputStreet == '') {
              setBorderStreet("red");
              setTimeout(() => {setBorderStreet('#0d0d10')},3000);
            } else {
              if (inputStreetNumber == '') {
                setBorderColorStreetNumber("red");
                setTimeout(() => {setBorderColorStreetNumber('#0d0d10')},3000);
              } else {
                if (inputNeighborhood == '') {
                  setBorderColorNeighborhood("red");
                  setTimeout(() => {setBorderColorNeighborhood('#0d0d10')},3000);
                } else {
                  if (inputState == '') {
                    setBorderColorState("red");
                    setTimeout(() => {setBorderColorState('#0d0d10')},3000);
                  } else {
                    if (inputDDD == '') {
                      setBorderColorDDD("red");
                      setTimeout(() => {setBorderColorDDD('#0d0d10')},3000);
                    } else {
                      if (inputPhone == '') {
                        setBorderColorPhone("red");
                        setTimeout(() => {setBorderColorPhone('#0d0d10')},3000);
                      } else {
                        submit();
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
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
        nationality: inputNationality,
        marital_status: inputMaritalStatus,
        age: inputAge,
        city: inputCity,
        street: inputStreet,
        street_number: inputStreetNumber,
        neighborhood: inputNeighborhood,
        state: inputState,
        ddd: inputDDD,
        phone: inputPhone,
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
    setNationality('');
    setInputMaritalStatus('');
    setInputAge('');
    setInputCity('');
    setInputStreet('');
    setInputStreetNumber('');
    setInputNeighborhood('');
    setInputState('');
    setInputDDD('');
    setInputPhone('');

    setLoad(false);
    setSave('Salvo com sucesso!');
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
            <Text style={styles.label}>Nacionalidade</Text>
            <TextInput
              style={[styles.input, {borderColor: borderColorNationality}]}
              placeholder="..."
              placeholderTextColor="#272730"
              keyboardType="default"
              autoCorrect={true}
              autoCapitalize="sentences"
              value={inputNationality}
              onChangeText={(text) => setNationality(text)}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => (maritalStatus.current && maritalStatus.current.focus())}
            />
          </View>

          {/** ESTADO CIVIL E IDADE*/}
          <View style={[styles.row, {marginBottom: 16}]}>
            <View style={[styles.boxInput, {width: '73.5%'}]}>
              <Text style={styles.label}>Estado Civil</Text>
              <TextInput
                style={[styles.input, {borderColor: borderColorMaritalStatus}]}
                placeholder="..."
                placeholderTextColor="#272730"
                keyboardType="default"
                autoCorrect={true}
                autoCapitalize="sentences"
                value={inputMaritalStatus}
                onChangeText={(text) => setInputMaritalStatus(text)}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => (age.current && age.current.focus())}
                ref={maritalStatus}
              />
            </View>

            <View style={[styles.boxInput, {width: '23.5%'}]}>
              <Text style={styles.label}>Idade</Text>
              <TextInput
                style={[styles.input, {borderColor: borderColorAge}]}
                placeholder="..."
                placeholderTextColor="#272730"
                keyboardType="number-pad"
                autoCorrect={false}
                autoCapitalize="sentences"
                value={inputAge}
                onChangeText={(text) => setInputAge(text)}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => (city.current && city.current.focus())}
                ref={age}
              />
            </View>
          </View>

          {/** CIDADE + ESTADO */}
          <View style={[styles.row, {marginBottom: 16}]}>
            <View style={[styles.boxInput, {width: '73.5%'}]}>
              <Text style={styles.label}>Cidade</Text>
              <TextInput
                style={[styles.input, {borderColor: borderColorCity}]}
                placeholder="..."
                placeholderTextColor="#272730"
                keyboardType="default"
                autoCorrect={true}
                autoCapitalize="sentences"
                value={inputCity}
                onChangeText={(text) => setInputCity(text)}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => (stateCity.current && stateCity.current.focus())}
                ref={city}
              />
            </View>

            <View style={[styles.boxInput, {width: '23.5%'}]}>
              <Text style={styles.label}>Estado</Text>
              <TextInput
                style={[styles.input, {borderColor: borderColorState, textTransform: 'uppercase'}]}
                placeholder="UF"
                placeholderTextColor="#272730"
                keyboardType="default"
                autoCorrect={true}
                autoCapitalize="sentences"
                value={inputState}
                onChangeText={(text) => setInputState(text)}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => (street.current && street.current.focus())}
                ref={stateCity}
              />
            </View>
          </View>

          {/** ENDEREÇO + NÚMERO */}
          <View style={[styles.row, {marginBottom: 16}]}>
            <View style={[styles.boxInput, {width: '73.5%'}]}>
              <Text style={styles.label}>Endereço</Text>
              <TextInput
                style={[styles.input, {borderColor: borderStreet}]}
                placeholder="..."
                placeholderTextColor="#272730"
                keyboardType="default"
                autoCorrect={true}
                autoCapitalize="sentences"
                value={inputStreet}
                onChangeText={(text) => setInputStreet(text)}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => (streetNumber.current && streetNumber.current.focus())}
                ref={street}
              />
            </View>

            <View style={[styles.boxInput, {width: '23.5%'}]}>
              <Text style={styles.label}>N°</Text>
              <TextInput
                style={[styles.input, {borderColor: borderColorStreetNumber}]}
                placeholder="S/N"
                placeholderTextColor="#272730"
                keyboardType="number-pad"
                autoCorrect={false}
                autoCapitalize="sentences"
                value={inputStreetNumber}
                onChangeText={(text) => setInputStreetNumber(text)}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => (neighborhood.current && neighborhood.current.focus())}
                ref={streetNumber}
              />
            </View>
          </View>

          {/** BAIRRO */}
          <View style={[styles.boxInput, {marginBottom: 16}]}>
            <Text style={styles.label}>Bairro</Text>
            <TextInput
              style={[styles.input, {borderColor: borderColorNeighborhood}]}
              placeholder="..."
              placeholderTextColor="#272730"
              keyboardType="default"
              autoCorrect={true}
              autoCapitalize="sentences"
              value={inputNeighborhood}
              onChangeText={(text) => setInputNeighborhood(text)}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => (ddd.current && ddd.current.focus())}
              ref={neighborhood}
            />
          </View>
          
          {/** DDD + TELEFONE */}
          <View style={styles.row}>
            <View style={[styles.boxInput, {width: '23.5%'}]}>
              <Text style={styles.label}>DDD</Text>
              <TextInput
                style={[styles.input, {borderColor: borderColorDDD}]}
                placeholder="..."
                placeholderTextColor="#272730"
                keyboardType="number-pad"
                autoCorrect={false}
                autoCapitalize="sentences"
                value={inputDDD}
                onChangeText={(text) => setInputDDD(text)}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => (phone.current && phone.current.focus())}
                ref={ddd}
              />
            </View>

            <View style={[styles.boxInput, {width: '73.5%'}]}>
              <Text style={styles.label}>Telefone</Text>
              <TextInput
                style={[styles.input, {borderColor: borderColorPhone}]}
                placeholder="..."
                placeholderTextColor="#272730"
                keyboardType="number-pad"
                autoCorrect={false}
                autoCapitalize="sentences"
                value={inputPhone}
                onChangeText={(text) => setInputPhone(text)}
                returnKeyType="send"
                onSubmitEditing={() => checking()}
                ref={phone}
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

export default PersonalData;