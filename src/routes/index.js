import React from 'react';
import {View, ActivityIndicator} from 'react-native';

import AppRoutes from '../routes/app.routes';
import AuthRoutes from '../routes/auth.routes';

function Routes(){
  const signed = false;
  const loading = false;

  if(loading){
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ccc'}}>
      <ActivityIndicator
        size={50}
        color={'#e52246'}
      />
    </View>;
  }
  return(
    signed ? <AppRoutes/> : <AuthRoutes/>
  );
}

export default Routes;
