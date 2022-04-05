import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Alert
} from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import { useRoute } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { userLoading } from "../../context";
import { userListDashboard } from '../../context/index';

type StackCompany = {navigation: {navigate:Function}}

/** COMPONENT COMPANY */
const Company: React.FC<StackCompany> = ({ navigation }) => {
  const { loading, setLoading } = userLoading();
  const months = ["dez","jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov"];

  /** ROUTES PARAMS */
  const route = useRoute() as any;
  const {vacancy} = route.params;

  /** FUNCTION FILTER API VACANCY */
  const { listDashboard } = userListDashboard();
  const [ filterVacancy, setFilterVacancy] = useState([]);

  const filters = () => {
    const filter = listDashboard.filter(item => {
      return item.id === vacancy;
    });
    setFilterVacancy(filter);
    setLoading(false);
    return filter;
  }
  useEffect(() => {filters()},[])
  
  const ResultApiCompany = () => {
    return (
      <>
        {filterVacancy.map(({
          id,
          name_company,
          starting_day,
          starting_month,
          starting_year,
          status_vacancy,
          office,
          descriptions,
          vacancy_requirements,
          benefit,
          salary_expectation,
          shipping_method,
          url_site,
          phone,
          email_company,
          email_subject
        }) => (
          <View style={{width: '100%', flex: 1}} key={id}>
            <ScrollView 
              style={{width: '100%'}}
              horizontal={false}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingVertical: 0,
                paddingHorizontal: 0,
              }}
            >
              <LinearGradient
                start={[1, 2.5]}
                style={styles.cardsJobs}
                colors={['#0d0d10', '#0d0d10', '#1b1b1e']}
              >
                <View style={styles.iconCompany}>
                  <Ionicons name="business-sharp" size={70} color="#5afa9a"/>
                </View>

                <View style={{flex: 1}}>
                  <Text style={[styles.txt, {fontSize: 24}]}>{name_company}</Text>
                  <Text style={[styles.txt, {color: 'gray'}]}>
                    publicado em {starting_day} de {months[starting_month]} de {starting_year}
                  </Text>
                  <Text style={[styles.txt, {color: '#5afa9a'}]}>{office}</Text>
                </View>
              </LinearGradient>

              {/* <TouchableOpacity onPress={() => handlePress()}>
                <LinearGradient
                  style={styles.admob}
                  start={[1, 3]}
                  colors={['#d55e38', '#0d0d10', '#1b1b1e']}
                >
                  <Text style={[styles.txt, {fontSize:18}]}>Baixe agora, Curriculum</Text>
                  <Text style={[styles.txt, {color:'gray'}]}>Um aplicativo para gerar currículo em PDF ou compartilhar nas redes sociais e e-mail</Text>
                </LinearGradient>
              </TouchableOpacity> */}

              {/** DESCRIPTIONS */}
              <LinearGradient
                start={[1, 2.5]}
                style={styles.descriptions}
                colors={['#0d0d10', '#0d0d10', '#1b1b1e']}
              >
                <Text style={[styles.txt, {fontSize: 18}]}>Descrição</Text>

                <Text style={[styles.txt, {color: 'gray'}]}>{descriptions}</Text>

                <Text style={[styles.txt, {fontSize: 18, marginTop: 16}]}>Requisitos de vaga</Text>
                <Text style={[styles.txt, {color: 'gray'}]}>{vacancy_requirements}</Text>

                <Text style={[styles.txt, {fontSize: 18, marginTop: 16}]}>Benefícios</Text>
                <Text style={[styles.txt, {color: 'gray'}]}>{benefit}</Text>

                <Text style={[styles.txt, {fontSize: 18, marginTop: 16}]}>Pretensão salarial</Text>
                <Text style={[styles.txt, {color: 'gray'}]}>{salary_expectation}</Text>
              </LinearGradient>
            </ScrollView>

            {status_vacancy == '0' ? 
              <View>
                <LinearGradient
                  style={styles.btnMail}
                  start={[1, 2.5]}
                  colors={['#0d0d10', '#0d0d10', '#1b1b1e']}
                >
                  <Text style={[styles.txt, {textTransform: 'uppercase', color:'#d55e38'}]}>indisponível</Text>
                </LinearGradient>
              </View>     
              :
              <>
                {shipping_method == 'email' ? 
                  <TouchableOpacity
                    onPress={() => {
                      MailComposer.composeAsync({
                        recipients:
                        [`${email_company}`],
                        subject: `${email_subject}`,
                        body: '',
                      });
                    }}
                  >
                    <LinearGradient
                      style={styles.btnMail}
                      start={[1, 2.5]}
                      colors={['#0d0d10', '#0d0d10', '#1b1b1e']}
                    >
                      <Text style={[styles.txt, {textTransform: 'uppercase'}]}>enviar currículo</Text>
                    </LinearGradient>
                  </TouchableOpacity>            
                : 
                  shipping_method == 'whatsapp' ?
                    <TouchableOpacity
                        style={{marginTop:30}}
                        onPress={() => Linking.canOpenURL("whatsapp://send?text=oi").then(supported => {
                        if (supported) {
                          return Linking.openURL(
                            `whatsapp://send?phone=${phone}&text=${email_subject}`
                          );
                        } else {
                          return Linking.openURL(
                            `https://api.whatsapp.com/send?phone=${phone}&text=${email_subject}`
                          );
                        }
                      })
                    }>
                      <LinearGradient
                        style={styles.btnMail}
                        start={[1, 2.5]}
                        colors={['#0d0d10', '#0d0d10', '#1b1b1e']}
                      >
                        <Text style={[styles.txt, {textTransform: 'uppercase'}]}>enviar currículo</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  :
                    <TouchableOpacity
                        style={{marginTop:30}}
                        onPress={() => Linking.canOpenURL("whatsapp://send?text=oi").then(supported => {
                        if (supported) {
                          return Linking.openURL(
                            `${url_site}`
                          );
                        } else {
                          return Linking.openURL(
                            `whatsapp://send?phone=5599981280576&text=Ops!%20algo%20deu%20errado%2C%20envie%20essa%20msg%20para%20o%20programador%2C%20erro%20com%20a%20vaga%20${email_subject}`
                          );
                        }
                      })
                    }>
                      <LinearGradient
                        style={styles.btnMail}
                        start={[1, 2.5]}
                        colors={['#0d0d10', '#0d0d10', '#1b1b1e']}
                      >
                        <Text style={[styles.txt, {textTransform: 'uppercase'}]}>enviar currículo</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                }
              </>
            }
          </View>
        ))}
      </>
    );
  }

  const supportedURL = "https://play.google.com/store/apps/details?id=rsanttos.manager";
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(supportedURL);
    if (supported) {
      await Linking.openURL(supportedURL);
    } else {
      Alert.alert(`Don't know how to open this URL: ${supportedURL}`);
    }
  }, [supportedURL]);

  return (
    <View  style={styles.container}>
      {loading == true ? <ActivityIndicator style={{
        flex:1, alignItems: 'center', justifyContent: 'center'
      }} size="large" color="#5afa9a"/> : 
        <ResultApiCompany />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#0d0d10',
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  txt: {
    fontWeight: '700',
    color: '#fff'
  },

  /** CARDS JOBS */
  cardsJobs: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginBottom: 16,
  },
  iconCompany: {
    width: 75,
    height: 75,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

  /** DESCRIPTIONS */
  descriptions: {
    width: '100%',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
    shadowRadius: 4,
    elevation: 4,
  },

  /** ADMOB */
  admob: {
    minHeight: 60,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 16,
    shadowRadius: 4,
    elevation: 4,
  },

  /** BTN MAIL */
  btnMail: {
    height: 55,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
    shadowRadius: 4,
    elevation: 4,
  }
});

export default Company;
