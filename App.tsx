import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Routes from './src/routes';
import ProvidedContext from './src/context';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaView style={{backgroundColor: '#1b1b1e', flex: 1}}>
      <ProvidedContext>
        <StatusBar style='light' backgroundColor='transparent' />
        <Routes />
      </ProvidedContext>
    </SafeAreaView>
  );
}