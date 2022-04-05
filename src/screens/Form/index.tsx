import React from "react";
import { 
  StyleSheet, 
  View, 
} from "react-native";
import { useRoute } from "@react-navigation/native";

import PersonalData from "../../components/Forms/PersonalData";
import About from "../../components/Forms/About";
import ExperienceCourses from "../../components/Forms/ExperienceCourses";

const Form: React.FC = () => {

  /** ROUTES PARAMS */
  const route = useRoute() as any;
  const {formType, title, names, keyArray, doIt, description, data} = route.params;

  return (
    <View style={styles.constainer}>
      { formType == "PersonalData" ? 
        <PersonalData title={title} data={data} doIt={doIt} /> 
        : formType == "About" ? 
        <About title={title} doIt={doIt} description={description}/> 
        : 
        <ExperienceCourses title={title} names={names} keyArray={keyArray} /> }
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
  },
})

export default Form;