import React from "react";
import LottieView from 'lottie-react-native';
import { View } from "react-native";
import loadingAnimation from '../../animations/loading.json';

const Lottie = () => {
  return (
    <View style={{
      width: '100%', 
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1b1b1e'
    }}>
      <LottieView
        style={{
          height: 250,
          alignSelf: 'center',
        }}
        autoPlay
        loop
        autoSize
        resizeMode="cover"
        source={loadingAnimation}
      />
    </View>
  )
}

export default Lottie;