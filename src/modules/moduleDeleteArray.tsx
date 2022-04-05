import firestore from '@react-native-firebase/firestore';
import { userListUser, userProfile } from '../context';

const moduleDeleteArray = () => {
  const { user } = userListUser();
  const { profiles } = userProfile();
  const objExperience = user.experience;
  const objFormation = user.formation;
  const objCourses = user.courses;

  const delCancelExperience = (key: number) => {
    if (profiles.profile_email_cv !== undefined) {
      firestore()
      .collection('users')
      .doc(profiles.profile_email_cv)
      .update({
        experience: firestore.FieldValue.arrayRemove(objExperience[key]),
      })
      .then(() => {
        console.log('Deleted Experience');
      })
      .catch(() => {
        console.log('Erro ao excluir');
      });
    }
  }

  const delCancelFormation = (key: number) => {
    if (profiles.profile_email_cv !== undefined) {
      firestore()
      .collection('users')
      .doc(profiles.profile_email_cv)
      .update({
        formation: firestore.FieldValue.arrayRemove(objFormation[key]),
      })
      .then(() => {
        console.log('Deleted Formation');
      })
      .catch(() => {
        console.log('Erro ao excluir');
      });
    }
  }

  const delCancelCourses = (key: number) => {
    if (profiles.profile_email_cv !== undefined) {
      firestore()
      .collection('users')
      .doc(profiles.profile_email_cv)
      .update({
        courses: firestore.FieldValue.arrayRemove(objCourses[key]),
      })
      .then(() => {
        console.log('Deleted Course');
      })
      .catch(() => {
        console.log('Erro ao excluir');
      });
    }
  }

  return {
    delCancelExperience,
    delCancelFormation,
    delCancelCourses,
  }
}

export default moduleDeleteArray;