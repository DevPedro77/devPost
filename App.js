import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes';

export default function App(){
  return(
    <NavigationContainer>
      <StatusBar barStyle={'light-content'} backgroundColor={'#000'} translucent={false}/>
      <Routes/>
    </NavigationContainer>
  );
}
