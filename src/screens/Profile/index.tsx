import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert, 
} from 'react-native';
import { FontAwesome, Entypo, Feather } from '@expo/vector-icons';
import { shareAsync } from 'expo-sharing';
import * as Print from 'expo-print';

import { userListUser, userModal } from '../../context/index';
import moduleDeleteArray from '../../modules/moduleDeleteArray';
import ModalComponent from '../../components/ModalCV';

type StackProfile = {navigation: {navigate:Function}}

/** PROFILE COMPONENT */
const Profile: React.FC<StackProfile> = ({ navigation }) => {
  const { user } = userListUser();

  const { setModalVisibleCV } = userModal();
  
  const objExperience = user.experience;
  const objFormation = user.formation;
  const objCourses = user.courses;

  /** HTML PRINT */
  const html = `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      <meta name="description" content="..." />
      <link rel="stylesheet" href="./styles.css" />
      <title>Curriculum</title>
      <style>
        * {
          width: 100%;
          margin: 0px;
          padding: 0px;
          border: 0px;
          object-fit: cover;
          box-sizing: border-box;
          text-decoration: none;
          list-style: none;
          outline: none;
          font-size: 100%;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        hr {
          width: 30%;
          border: 0;
          border-top: 2px solid #ccc;
          margin: 0 0 16px 0;
          padding: 0;
        }
        #main {
          height: 100vh;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          margin: 0 auto;
        }
        #aside {
          width: 35%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          background-color: rgb(26, 64, 73);
          padding: 32px 16px;
          color: #fff;
        }
        #aside .aside-box {
          width: 100%;
          margin-bottom: 32px;
        }
        #aside .aside-box .img {
          width: 100px; 
          height: 125px;
          border-radius: 8px;
        }
        #aside .position-img {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        #aside .aside-box h2 {
          font-size: 1.1em;
          font-weight: 600;
          margin-bottom: 16px;
        }
        #aside .aside-box h3 {
          font-size: 1em;
          font-weight: normal;
        }
        #aside .aside-box p {
          font-size: 0.9em;
          color: #b4b4b4;
        }
        #aside .aside-box .box-info {
          margin-bottom: 16px;
        }

        #body {
          width: 65%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          padding: 32px 16px;
        }
        #body .pesonal-data .box-info {
          margin-bottom: 32px;
        }
        #body .pesonal-data .box-info h2 {
          font-size: 2.5em;
          font-weight: 600;
        }
        #body .pesonal-data .box-info h3 {
          font-size: 1.5em;
          margin-bottom: 16px;
        }
        #body .pesonal-data .box-info p {
          font-size: 18px;
        }
        #body .experiences h2 {
          font-size: 1.5em;
          margin-bottom: 16px;
        }
        #body .experiences .box-info {
          margin-bottom: 32px;
        }
        #body .formation h2 {
          font-size: 1.5em;
          margin-bottom: 16px;
        }
        #body .formation .box-info {
          margin-bottom: 32px;
        }

        @media print {
          #aside {
            background-color: rgb(26, 64, 73)!important;
            -webkit-print-color-adjust: exact; 
          }
        }
      </style>
    </head>
    <body>
      <main id="main">
        <aside id="aside">
          <div class="aside-box position-img">
            <img src="${user.photo == undefined ? '...' : user.photo}" alt="profile" class="img" />
          </div>

          <div class="aside-box">
            <h2>Contato</h2>
            <p>Tel.: (${user.ddd == undefined ? '...' : user.ddd}) ${user.phone == undefined ? '...' : user.phone}</p>
            <p>${user.email == undefined ? '...' : user.email}</p>
            <br />
            <p>${user.street == undefined ? '...' : user.street}, N?? ${user.street_number == undefined ? '...' : user.street_number}</p>
            <p>Jardim Morada Do Sol</p>
            <p>${user.city == undefined ? '...' : user.city}-${user.state == undefined ? '...' : user.state}</p>
          </div>

          <div class="aside-box">
            <h2>Certifications</h2>
            ${user.courses[0] == undefined ? '' : `
              <div class="box-info">
                <h3>${user.courses[0].courses}</h3>
                <p>${user.courses[0].institution}</p>
                <p>Ano: ${user.courses[0].periodStart} a ${user.courses[0].periodFinish}</p>
              </div>
            `}

            ${user.courses[1] == undefined ? '' : `
              <div class="box-info">
                <h3>${user.courses[1].courses}</h3>
                <p>${user.courses[1].institution}</p>
                <p>Ano: ${user.courses[1].periodStart} a ${user.courses[1].periodFinish}</p>
              </div>
            `}

            ${user.courses[2] == undefined ? '' : `
              <div class="box-info">
                <h3>${user.courses[2].courses}</h3>
                <p>${user.courses[2].institution}</p>
                <p>Ano: ${user.courses[2].periodStart} a ${user.courses[2].periodFinish}</p>
              </div>
            `}

            ${user.courses[3] == undefined ? '' : `
              <div class="box-info">
                <h3>${user.courses[3].courses}</h3>
                <p>${user.courses[3].institution}</p>
                <p>Ano: ${user.courses[3].periodStart} a ${user.courses[3].periodFinish}</p>
              </div>
            `}

            ${user.courses[4] == undefined ? '' : `
              <div class="box-info">
                <h3>${user.courses[4].courses}</h3>
                <p>${user.courses[4].institution}</p>
                <p>Ano: ${user.courses[4].periodStart} a ${user.courses[4].periodFinish}</p>
              </div>
            `}

            ${user.courses[5] == undefined ? '' : `
              <div class="box-info">
                <h3>${user.courses[5].courses}</h3>
                <p>${user.courses[5].institution}</p>
                <p>Ano: ${user.courses[5].periodStart} a ${user.courses[5].periodFinish}</p>
              </div>
            `}

            ${user.courses[6] == undefined ? '' : `
              <div class="box-info">
                <h3>${user.courses[6].courses}</h3>
                <p>${user.courses[6].institution}</p>
                <p>Ano: ${user.courses[6].periodStart} a ${user.courses[6].periodFinish}</p>
              </div>
            `}
          </div>
        </div>
        </aside>

        <section id="body">
          <div class="pesonal-data">
            <div class="box-info">
              <h2>${user.fullName == undefined ? '...' : user.fullName}</h2>
              <p>${user.nationality == undefined ? '...' : user.nationality}, ${user.marital_status == undefined ? '...' : user.marital_status}, ${user.age == undefined ? '...' : user.age} Anos</p>
              <p style="color: gray;">${user.city == undefined ? '...' : user.city}</p>
            </div>

            <div class="box-info about">
              <h3>Resumo</h3>
              <p>${user.about == undefined ? '...' : user.about}</p>
            </div>
          </div>

          <hr />
          <div class="experiences">
            <h2>Experi??ncia</h2>
            ${user.experience[0] == undefined ? '' : `
              <div class="box-info">
                <h3>${user.experience[0].vacancy}</h3>
                <p>${user.experience[0].institution}</p>
                <p style="color: gray;">Ano: ${user.experience[0].periodStart} a ${user.experience[0].periodFinish}</p>
              </div>
            `}
            ${user.experience[1] == undefined ? '' : `
              <div class="box-info">
                <h3>${user.experience[1].vacancy}</h3>
                <p>${user.experience[1].institution}</p>
                <p style="color: gray;">Ano: ${user.experience[1].periodStart} a ${user.experience[1].periodFinish}</p>
              </div>
            `}
            ${user.experience[2] == undefined ? '' : `
              <div class="box-info">
                <h3>${user.experience[2].vacancy}</h3>
                <p>${user.experience[2].institution}</p>
                <p style="color: gray;">Ano: ${user.experience[2].periodStart} a ${user.experience[2].periodFinish}</p>
              </div>
            `}
            ${user.experience[3] == undefined ? '' : `
              <div class="box-info">
                <h3>${user.experience[3].vacancy}</h3>
                <p>${user.experience[3].institution}</p>
                <p style="color: gray;">Ano: ${user.experience[3].periodStart} a ${user.experience[3].periodFinish}</p>
              </div>
            `}
          </div>

          <hr />
          <div class="formation">
            <h2>Forma????o</h2>
            ${user.formation[0] == undefined ? '' : `
              <div class="box-info">
                <h3>${user.formation[0].courses}</h3>
                <p>${user.formation[0].institution}</p>
                <p>Ano: ${user.formation[0].periodStart} a ${user.formation[0].periodFinish}</p>
              </div>
            `}
            ${user.formation[1] == undefined ? '' : `
              <div class="box-info">
                <h3>${user.formation[1].courses}</h3>
                <p>${user.formation[1].institution}</p>
                <p>Ano: ${user.formation[1].periodStart} a ${user.formation[1].periodFinish}</p>
              </div>
            `}
            ${user.formation[2] == undefined ? '' : `
              <div class="box-info">
                <h3>${user.formation[2].courses}</h3>
                <p>${user.formation[2].institution}</p>
                <p>Ano: ${user.formation[2].periodStart} a ${user.formation[2].periodFinish}</p>
              </div>
            `}
          </div>
        </section>
      </main>
    </body>
    </html>
  `;
  
  /** FUNCTION PRINT */
  const print = async () => { await Print.printAsync({ html })}
  const printToFile = async () => {
    const { uri } = await Print.printToFileAsync({ html });
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  }

  /** ROUTES FUNCTIONS */
  function personalData(personalDataObj:object, doIt: string) {
    navigation.navigate('Form', { formType: 'PersonalData', title: 'Dados Pessoais', data: personalDataObj, doIt: doIt });
  }

  function about(doIt:string, description: string) {
    navigation.navigate('Form', { formType: 'About', title: 'Fale sobre voc??', doIt: doIt, description: description });
  }

  function experienceCourses(title: string, names: string, keyArray: string) {
    navigation.navigate('Form', { formType: 'ExperienceCourses', title: title, names: names, keyArray: keyArray });
  }

  /** FUNCTION ALERT DEL */
  const createTwoButtonAlert = (key:number, nameObj:string) =>
    Alert.alert(
      "Voc?? realmente deseja excluir?",
      "",
      [
        {
          text: "N??o",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Sim", onPress: () => deleteObject(key, nameObj) }
      ],
      { cancelable: false }
    );

  /** FUNCTION DELETE CANCEL */
  const moduleDelete = moduleDeleteArray();
  const deleteObject = (key: number, nameObj: string) => {
    switch (nameObj) {
      case 'experience':
        moduleDelete.delCancelExperience(key);
        break;
    
      case 'formation':
        moduleDelete.delCancelFormation(key);
        break;

      case 'courses':
        moduleDelete.delCancelCourses(key);
        break;

      default:
        break;
    }
  }

  /** OBJ PESSONAL DATA */
  const personalDataObj = {
    'nationality': user.nationality,
    'marital_status': user.marital_status,
    'age': user.age,
    'city': user.city,
    'state': user.state,
    'street': user.street,
    'street_number': user.street_number,
    'neighborhood': user.neighborhood,
    'ddd': user.ddd,
    'phone': user.phone,
  };

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.boxProfile}>
          <Text style={[styles.txt, {color: 'gray'}]}>{salutation}</Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity 
            style={styles.btnNotification}
            onPress={() => print()}
          >
            <Entypo name="print" size={16} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.btnNotification, {marginLeft: 8}]}
            onPress={() => printToFile()}
          >
            <Feather name="share-2" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{width: '100%'}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center', 
          backgroundColor: '#0d0d10',
          paddingHorizontal: 8,
        }}
      >
        <View style={[styles.box, {marginTop: 8}]}>
          <View style={styles.row}>
            <TouchableOpacity></TouchableOpacity>

            <TouchableOpacity style={styles.btnEdit} onPress={() => setModalVisibleCV(true)}>
              <FontAwesome name="edit" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <Image
            style={styles.profileImg}
            source={{uri: `${user.photo}`}}
          />
          <Text style={styles.txt}>{user.fullName}</Text>
          <Text style={styles.txt}>{user.email}</Text>
        </View>

        {/** DADOS PESSOAIS */}
        <View style={styles.box}>
          <View style={styles.row}>
            <Text style={[styles.txt, {fontSize: 18}]}>Dados Pessoais</Text>
            {user.nationality ? 
              <TouchableOpacity 
                style={styles.btnEdit} 
                onPress={() => personalData(personalDataObj, 'edit')}
              >
                <FontAwesome name="edit" size={24} color="#fff" />
              </TouchableOpacity>            
            :
              <TouchableOpacity 
                style={styles.btnEdit} 
                onPress={() => personalData(personalDataObj, 'edit')}
              >
                <FontAwesome name="plus" size={20} color="#fff" />
              </TouchableOpacity>
            }
          </View>

          {/** NACIONALIDADE */}
          <View style={styles.boxInfo}>
            <Text style={styles.label}>Nacionalidade</Text>
            <Text style={styles.txt}>{user.nationality ? user.nationality : '...'}</Text>
          </View>

          {/** ESTADO CIVIL */}
          <View style={[styles.boxInfo, styles.boxRow]}>
            <View>
              <Text style={styles.label}>Estado civil</Text>
              <Text style={[styles.txt, {textTransform: 'capitalize'}]}>
                {user.marital_status ? user.marital_status : '...'}</Text>
            </View>

            {/** IDADE */}
            <View style={{alignItems: 'flex-end'}}>
              <Text style={styles.label}>idade</Text>
              <Text style={[styles.txt, {textTransform: 'capitalize'}]}>
                {user.age ? `${user.age} anos` : '...'}
              </Text>
            </View>
          </View>

          {/** CIDADE */}
          <View style={[styles.boxInfo, styles.boxRow]}>
            <View>
              <Text style={styles.label}>cidade</Text>
              <Text style={[styles.txt, {textTransform: 'capitalize'}]}>
                {user.city ? user.city : '...'}
              </Text>
            </View>
            
            <View style={{alignItems: 'flex-end'}}>
              <Text style={styles.label}>estado</Text>
              <Text style={[styles.txt, {textTransform: 'uppercase'}]}>
                {user.state ? user.state : '...'}
              </Text>
            </View>
          </View>

          {/** ENDERE??O */}
          <View style={[styles.boxInfo, styles.boxRow]}>
            <View>
              <Text style={styles.label}>Endere??o</Text>
              <Text style={[styles.txt, {textTransform: 'capitalize'}]}>
                {user.street ? user.street : '...'}
              </Text>
            </View>
            
            <View style={{alignItems: 'flex-end'}}>
              <Text style={styles.label}>N??mero</Text>
              <Text style={[styles.txt, {textTransform: 'capitalize'}]}>
                {user.street_number ? user.street_number : '...'}
              </Text>
            </View>
          </View>

          {/** BAIRRO */}
          <View style={styles.boxInfo}>
            <Text style={styles.label}>bairro</Text>
            <Text style={styles.txt}>
              {user.neighborhood ? user.neighborhood : '...'}
            </Text>
          </View>

          {/** TELEFONE */}
          <View style={[styles.boxInfo, styles.boxRow]}>
            <View>
              <Text style={styles.label}>ddd</Text>
              <Text style={[styles.txt, {textTransform: 'capitalize'}]}>
                {user.ddd ? user.ddd : '...'}
              </Text>
            </View>
            
            <View style={{alignItems: 'flex-end'}}>
              <Text style={styles.label}>telefonme</Text>
              <Text style={[styles.txt, {textTransform: 'uppercase'}]}>
                {user.phone ? user.phone : '...'}
              </Text>
            </View>
          </View>
        </View>

        {/** SOBRE */}
        <View style={styles.box}>
          <View style={styles.row}>
            <Text style={[styles.txt, {fontSize: 18}]}>Fale sobre voc??</Text>
            {user.about ?
              <TouchableOpacity style={styles.btnEdit} onPress={() => about('edit', `${user.about}`)}>
                <FontAwesome name="edit" size={24} color="#fff" />
              </TouchableOpacity>
            : 
              <TouchableOpacity style={styles.btnEdit} onPress={() => about('add', '')}>
                <FontAwesome name="plus" size={20} color="#fff" />
              </TouchableOpacity>
            }
          </View>
          
          <View style={{width: '100%'}}>
            <Text style={styles.txt}>
              {user.about ? user.about : '...'}
            </Text>
          </View>
        </View>

        {/** EXPERI??NCIAS */}
        <View style={styles.box}>
          <View style={styles.row}>
            <Text style={[styles.txt, {fontSize: 18}]}>Experi??ncia</Text>
            {objExperience == undefined ? <></> : 
              objExperience.length == 4 ? 
                <></>
              :
                <TouchableOpacity 
                  style={styles.btnEdit} 
                  onPress={() => experienceCourses('Experi??ncias', 'Cargo', 'experience')}
                >
                  <FontAwesome name="plus" size={20} color="#fff" />
                </TouchableOpacity>            
            }

          </View>
          
          {user.experience[0] ? 
            <View style={[styles.boxInfo, styles.boxRow]}>
              <View>
                <Text style={styles.txt}>
                  {user.experience ? user.experience[0].vacancy : '...'}
                </Text>
                <Text style={styles.label}>
                  {user.experience ? user.experience[0].institution : '...'}
                </Text>
                <Text style={styles.label}>
                  {user.experience ? user.experience[0].periodStart : '...'} a {user.experience[0] ? user.experience[0].periodFinish : '...'}
                </Text>
              </View>

              <TouchableOpacity style={styles.btnPlus} onPress={() => createTwoButtonAlert(0, 'experience')}>
                <FontAwesome name="times" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          : 
            <></>
          }

          {user.experience[1] ? 
            <View style={[styles.boxInfo, styles.boxRow]}>
              <View>
                <Text style={styles.txt}>
                  {user.experience[1] ? user.experience[1].vacancy: '...'}
                </Text>
                <Text style={styles.label}>
                  {user.experience[1] ? user.experience[1].institution : '...'}
                </Text>
                <Text style={styles.label}>
                  {user.experience[1] ? user.experience[1].periodStart : '...'} a {user.experience[1] ? user.experience[1].periodFinish : '...'}
                </Text>
              </View>

              <TouchableOpacity style={styles.btnPlus} onPress={() => createTwoButtonAlert(1, 'experience')}>
                <FontAwesome name="times" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          : 
            <></>
          }

          {user.experience[2] ? 
            <View style={[styles.boxInfo, styles.boxRow]}>
              <View>
                <Text style={styles.txt}>
                  {user.experience[2] ? user.experience[2].vacancy: '...'}
                </Text>
                <Text style={styles.label}>
                  {user.experience[2] ? user.experience[2].institution : '...'}
                </Text>
                <Text style={styles.label}>
                  {user.experience[2] ? user.experience[2].periodStart : '...'} a {user.experience[2] ? user.experience[2].periodFinish : '...'}
                </Text>
              </View>

              <TouchableOpacity style={styles.btnPlus} onPress={() => createTwoButtonAlert(2, 'experience')}>
                <FontAwesome name="times" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          : 
            <></>
          }

          {user.experience[3] ? 
            <View style={[styles.boxInfo, styles.boxRow]}>
              <View>
                <Text style={styles.txt}>
                  {user.experience[3] ? user.experience[3].vacancy: '...'}
                </Text>
                <Text style={styles.label}>
                  {user.experience[3] ? user.experience[3].institution : '...'}
                </Text>
                <Text style={styles.label}>
                  {user.experience[3] ? user.experience[3].periodStart : '...'} a {user.experience[3] ? user.experience[3].periodFinish : '...'}
                </Text>
              </View>

              <TouchableOpacity style={styles.btnPlus} onPress={() => createTwoButtonAlert(3, 'experience')}>
                <FontAwesome name="times" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          : 
            <></>
          }
        </View>

        {/** FORMA????O */}
        <View style={styles.box}>
          <View style={styles.row}>
            <Text style={[styles.txt, {fontSize: 18}]}>Forma????o</Text>
            {objFormation == undefined ? <></> : 
              objFormation.length == 3 ? <></> :
                <TouchableOpacity 
                  style={styles.btnEdit} 
                  onPress={() => experienceCourses('Forma????o', 'Nome do curso', 'formation')}
                >
                  <FontAwesome name="plus" size={20} color="#fff" />
                </TouchableOpacity>
            }
          </View>
          
          {user.formation[0] ? 
            <View style={[styles.boxInfo, styles.boxRow]}>
              <View>
                <Text style={styles.txt}>
                  {user.formation ? user.formation[0].courses : '...'}
                </Text>
                <Text style={styles.label}>
                  {user.formation ? user.formation[0].institution : '...'}
                </Text>
                <Text style={styles.label}>
                  {user.formation ? user.formation[0].periodStart : '...'} a {user.formation ? user.formation[0].periodFinish : '...'}
                </Text>
              </View>

              <TouchableOpacity style={styles.btnPlus} onPress={() => createTwoButtonAlert(0, 'formation')}>
                <FontAwesome name="times" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          : 
            <></>
          }

          {user.formation[1] ? 
            <View style={[styles.boxInfo, styles.boxRow]}>
              <View>
                <Text style={styles.txt}>
                  {user.formation ? user.formation[1].courses: '...'}
                </Text>
                <Text style={styles.label}>
                  {user.formation ? user.formation[1].institution : '...'}
                </Text>
                <Text style={styles.label}>
                  {user.formation ? user.formation[1].periodStart : '...'} a {user.formation ? user.formation[1].periodFinish : '...'}
                </Text>
              </View>

              <TouchableOpacity style={styles.btnPlus} onPress={() => createTwoButtonAlert(1, 'formation')}>
                <FontAwesome name="times" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          : 
            <></>
          }

          {user.formation[2] ? 
            <View style={[styles.boxInfo, styles.boxRow]}>
              <View>
                <Text style={styles.txt}>
                  {user.formation ? user.formation[2].courses: '...'}
                </Text>
                <Text style={styles.label}>
                  {user.formation ? user.formation[2].institution : '...'}
                </Text>
                <Text style={styles.label}>
                  {user.formation ? user.formation[2].periodStart : '...'} a {user.formation ? user.formation[2].periodFinish : '...'}
                </Text>
              </View>

              <TouchableOpacity style={styles.btnPlus} onPress={() => createTwoButtonAlert(2, 'formation')}>
                <FontAwesome name="times" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          : 
            <></>
          }
        </View>

        {/** CURSOS */}
        <View style={styles.box}>
          <View style={styles.row}>
            <Text style={[styles.txt, {fontSize: 18}]}>Cursos</Text>
            {objCourses == undefined ?  <></> : 
              objCourses.length == 7 ? 
                <></>
              : 
                <TouchableOpacity 
                  style={styles.btnEdit} 
                  onPress={() => experienceCourses('Cursos', 'Nome do curso', 'courses')}
                >
                  <FontAwesome name="plus" size={20} color="#fff" />
                </TouchableOpacity>
            }

          </View>
          
          {user.courses[0] ? 
            <View style={[styles.boxInfo, styles.boxRow]}>
              <View>
                <Text style={styles.txt}>
                  {user.courses ? user.courses[0].courses: '...'}
                </Text>
                <Text style={styles.label}>
                  {user.courses ? user.courses[0].institution : '...'}
                </Text>
                <Text style={styles.label}>
                  {user.courses ? user.courses[0].periodStart : '...'} a {user.courses ? user.courses[0].periodFinish : '...'}
                </Text>
              </View>

              <TouchableOpacity style={styles.btnPlus} onPress={() => createTwoButtonAlert(0, 'courses')}>
                <FontAwesome name="times" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          :
            <></>
          }

          {user.courses[1] ? 
            <View style={[styles.boxInfo, styles.boxRow]}>
              <View>
                <Text style={styles.txt}>
                  {user.courses ? user.courses[1].courses: '...'}
                </Text>
                <Text style={styles.label}>
                  {user.courses ? user.courses[1].institution : '...'}
                </Text>
                <Text style={styles.label}>
                  {user.courses ? user.courses[1].periodStart : '...'} a {user.courses ? user.courses[1].periodFinish : '...'}
                </Text>
              </View>

              <TouchableOpacity style={styles.btnPlus} onPress={() => createTwoButtonAlert(1, 'courses')}>
                <FontAwesome name="times" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          : 
            <></>
          }

          {user.courses[2] ? 
            <View style={[styles.boxInfo, styles.boxRow]}>
              <View>
                <Text style={styles.txt}>
                  {user.courses ? user.courses[2].courses: '...'}
                </Text>
                <Text style={styles.label}>
                  {user.courses ? user.courses[2].institution : '...'}
                </Text>
                <Text style={styles.label}>
                  {user.courses ? user.courses[2].periodStart : '...'} a {user.courses ? user.courses[2].periodFinish : '...'}
                </Text>
              </View>

              <TouchableOpacity style={styles.btnPlus} onPress={() => createTwoButtonAlert(2, 'courses')}>
                <FontAwesome name="times" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          : 
            <></>
          }

          {user.courses[3] ? 
            <View style={[styles.boxInfo, styles.boxRow]}>
              <View>
                <Text style={styles.txt}>
                  {user.courses ? user.courses[3].courses: '...'}
                </Text>
                <Text style={styles.label}>
                  {user.courses ? user.courses[3].institution : '...'}
                </Text>
                <Text style={styles.label}>
                  {user.courses ? user.courses[3].periodStart : '...'} a {user.courses ? user.courses[3].periodFinish : '...'}
                </Text>
              </View>

              <TouchableOpacity style={styles.btnPlus} onPress={() => createTwoButtonAlert(3, 'courses')}>
                <FontAwesome name="times" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          : 
            <></>
          }

          {user.courses[4] ? 
            <View style={[styles.boxInfo, styles.boxRow]}>
              <View>
                <Text style={styles.txt}>
                  {user.courses ? user.courses[4].courses: '...'}
                </Text>
                <Text style={styles.label}>
                  {user.courses ? user.courses[4].institution : '...'}
                </Text>
                <Text style={styles.label}>
                  {user.courses ? user.courses[4].periodStart : '...'} a {user.courses ? user.courses[4].periodFinish : '...'}
                </Text>
              </View>

              <TouchableOpacity style={styles.btnPlus} onPress={() => createTwoButtonAlert(4, 'courses')}>
                <FontAwesome name="times" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          : 
            <></>
          }

          {user.courses[4] ? 
            <View style={[styles.boxInfo, styles.boxRow]}>
              <View>
                <Text style={styles.txt}>
                  {user.courses ? user.courses[4].courses: '...'}
                </Text>
                <Text style={styles.label}>
                  {user.courses ? user.courses[4].institution : '...'}
                </Text>
                <Text style={styles.label}>
                  {user.courses ? user.courses[4].periodStart : '...'} a {user.courses ? user.courses[4].periodFinish : '...'}
                </Text>
              </View>

              <TouchableOpacity style={styles.btnPlus} onPress={() => createTwoButtonAlert(4, 'courses')}>
                <FontAwesome name="times" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          : 
            <></>
          }

          {user.courses[5] ? 
            <View style={[styles.boxInfo, styles.boxRow]}>
              <View>
                <Text style={styles.txt}>
                  {user.courses ? user.courses[5].courses: '...'}
                </Text>
                <Text style={styles.label}>
                  {user.courses ? user.courses[5].institution : '...'}
                </Text>
                <Text style={styles.label}>
                  {user.courses ? user.courses[5].periodStart : '...'} a {user.courses ? user.courses[5].periodFinish : '...'}
                </Text>
              </View>

              <TouchableOpacity style={styles.btnPlus} onPress={() => createTwoButtonAlert(5, 'courses')}>
                <FontAwesome name="times" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          : 
            <></>
          }

          {user.courses[6] ? 
            <View style={[styles.boxInfo, styles.boxRow]}>
              <View>
                <Text style={styles.txt}>
                  {user.courses ? user.courses[6].courses: '...'}
                </Text>
                <Text style={styles.label}>
                  {user.courses ? user.courses[6].institution : '...'}
                </Text>
                <Text style={styles.label}>
                  {user.courses ? user.courses[6].periodStart : '...'} a {user.courses ? user.courses[6].periodFinish : '...'}
                </Text>
              </View>

              <TouchableOpacity style={styles.btnPlus} onPress={() => createTwoButtonAlert(6, 'courses')}>
                <FontAwesome name="times" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          : 
            <></>
          }
        </View>
      </ScrollView>

      <ModalComponent />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start', 
    backgroundColor: '#0d0d10',
  },
  txt: {
    fontWeight: '700',
    color: '#fff'
  },
  box: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#1b1b1e',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  btnEdit: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  /** HEADER */
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#1b1b1e',
  },
  boxProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
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

  /** PROFILE */
  profileImg: {
    width: 96,
    height: 96,
    borderRadius: 16,
    marginBottom: 16,
  },
  /** DADOS PESSOAIS */
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  boxInfo: {
    width: '100%',
    marginBottom: 8,
    borderBottomColor: '#0d0d10',
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  boxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontWeight: '700',
    fontSize: 10,
    color: 'gray',
    textTransform: 'uppercase',
  },

  /** EXPERI???NCIAS */
  btnPlus: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Profile;