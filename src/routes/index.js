import React from 'react';
import {View, ActivityIndicator} from 'react-native';

import AppRoutes from '../routes/app.routes';
import AuthRoutes from '../routes/auth.routes';

function Routes(){
  const signed = false;
  const loading = false;

  if(loading){
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000'}}>
      <ActivityIndicator
        size={50}
        color={'#fff'}
      />
    </View>
    );

  }
  return(
    signed ? <AppRoutes/> : <AuthRoutes/>
  );
}

export default Routes;
