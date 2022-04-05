import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  FlatList,
  Share
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Fontisto, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { userListDashboard, userLoading, userModal, userProfile, userTokenProfile } from "../../context";
import BarProgress from "../../components/BarProgress";
import ModalComponent from "../../components/Modal";
import submit from "../../modules/save";
import groupByArray from "../../modules/filter";
import firebaseServer from "../../modules/server";

type StackDashboard = {navigation: {navigate:Function}}

/** COMPONENT DASHBOARD */
const Dashboard: React.FC<StackDashboard> = ({navigation}) => {
  const { profiles } = userProfile();
  const months = ["dez","jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov"];

  const { loading, setLoading } = userLoading();
  const { setModalVisible } = userModal();
  
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
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {saveDatabaseApi()}, []);

  /** FILTER TOTAL VACANCY */
  const [totalVacancy, setTotalVacancy] = useState(0);
  const { listDashboard } = userListDashboard();
  const reduceVacancy = () => {
    try {
      let soma = listDashboard.reduce((
        prevValue:number, numberValue) => 
        prevValue + parseInt(numberValue.status_vacancy), 0 )
      setTotalVacancy(soma);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {reduceVacancy()},[listDashboard]);

  /** FILTER GROUP BY */
  const groupArray = groupByArray();
  const { setGroupBy } = userListDashboard();
  useEffect(() => {
    setGroupBy(groupArray.groupBy(listDashboard, 'office'));
  }, [listDashboard]);

  /** FUNCTION ON SHARE */
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'App Empregos Itz\nhttps://play.google.com/store/apps/details?id=com.empregos',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error);
    }
  }

  /** ACTIVITY INDICATOR */
  const Indicator = useCallback(() => {
    return (
      <View style={{
        width: 300,
        height: 55,
        paddingVertical: 16,
        alignContent: 'center',
        justifyContent: 'center',
      }}>
        <ActivityIndicator size="small" color="#5afa9a"/>
      </View>
    )
  },[loading])

  /** FUNCTION SALUTATION */
  const hours = new Date();
  const salutations = hours.getHours();
  const [salutation, setSalutation] = useState('');
  useEffect(() => {    
    if (salutations >= 0 && salutations <= 11) {
      setSalutation("Bom Dia...");
    } else if (salutations >= 12 && salutations <= 18) {
      setSalutation("Boa Tarde...");
    } else if (salutations >= 19 && salutations <= 23) {
      setSalutation("Boa Noite...");
    } else {
      setSalutation("Hello");
    }
  },[salutation]);

  /** TOTAL VACANCY */
  const TotalVacancy = () => {
    return (
      <>
        <View style={styles.header}>
          <View style={styles.boxProfile}>
            <TouchableOpacity onPress={() => profileScreen()}>
              <Image
                style={styles.picture}  
                source={profiles ? {uri: profiles.picture_itz} : {uri: 'default'}}
              />
            </TouchableOpacity>

            <View>
              <Text
                numberOfLines={1}
                style={[styles.txt, {fontSize: 18}]}
              >
                Olá {profiles ? profiles.profile_given_name_cv : ''}
              </Text>
              <Text style={[styles.txt, {color: 'gray'}]}>{salutation}</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity 
              style={styles.btnNotification}
              onPress={() => onShare()}
            >
              <Feather name="share-2" size={16} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.btnNotification, {marginLeft: 8}]}
              onPress={() => setModalVisible(true)}
            >
              <Fontisto name="info" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.todayVacanciesTitle}>
          {loading ? <ActivityIndicator size="large" color="#5afa9a"/> : 
            <Text style={[styles.txt, {fontSize: 40}]}>{'0'+(totalVacancy.toString()).slice(-2)}</Text>
          }
          <Text style={[styles.txt, {color: 'gray', paddingLeft: 16}]}>total de vagas{'\n'}em Imperatriz hoje</Text>
        </View>
      </>
    )
  };

  /** FUNCTIONS ROUTES */
  function company(vacancy:string) {
    navigation.navigate('Company',{vacancy}
  )};

  function profileScreen() {
    navigation.navigate('Profile');
  }

  return (
    <View  style={styles.container}>
      <View style={styles.aside}>
        <Text style={[styles.txt, {marginBottom: 8}]}>9h</Text>

        <BarProgress />

        <Text style={[styles.txt, {marginTop: 8}]}>18h</Text>
      </View>

      <FlatList
        contentContainerStyle={{
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={TotalVacancy}
        ListFooterComponent={loading ? <Indicator /> : <View style={{width: '100%', height: 55}}/>}
        data={listDashboard}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <LinearGradient
            start={[1, 2.5]}
            style={{width: '100%', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 8}}
            colors={['#0d0d10', '#1b1b1e', '#1b1b1e']}
          >
            <TouchableOpacity style={styles.cardsJobs} onPress={() => company(item.id)}>
              <View style={styles.iconCompany}>
                <Text style={styles.txt}>{item.starting_day}</Text>
                <Text style={[styles.txt, {fontSize: 12, textTransform: 'capitalize'}]}>{months[item.starting_month]}</Text>
              </View>

              <View style={{flex: 1}}>
                <Text style={[styles.txt, {color: 'gray'}]}>{item.name_company}</Text>
                <Text style={[styles.txt, {fontSize:16}]}>{item.office}</Text>
                {item.status_vacancy == '0' ? 
                  <Text style={[styles.txt, {color: '#d55e38'}]}>------</Text>
                  :
                  <Text style={[styles.txt, {color: '#5afa9a'}]}>------</Text>
                }
              </View>
            </TouchableOpacity>
          </LinearGradient>
        )}
      />

      <ModalComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    backgroundColor: '#1b1b1e',
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  txt: {
    fontWeight: '700',
    color: '#fff'
  },

  /** ASIDE */
  aside: {
    width: '12%',
    height: '100%',
    backgroundColor: '#0d0d10',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /** HEADER */
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  boxProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  picture: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 8,
  },
  btnNotification: {
    width: 40,
    height: 40,
    borderRadius: 40/2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'gray',
  },

  /** TODAY VACANCIES */
  todayVacanciesTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 8,
  },
  cardsJobs: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 8,
    paddingVertical: 8,
  },
  iconCompany: {
    width: 40,
    height: 80,
    borderRadius: 60/2,
    backgroundColor: '#1b1b1e',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    elevation: 4,
    shadowColor: '#fff',
    shadowRadius: 8,
  }
});

export default Dashboard;