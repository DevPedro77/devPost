import React, {useContext} from 'react';
import {View, ActivityIndicator} from 'react-native';

import AppRoutes from '../routes/app.routes';
import AuthRoutes from '../routes/auth.routes';

import {AuthContext} from '../contexts/auth';

function Routes(){
  const {signed, loading} = useContext(AuthContext);

  if(loading){
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000'}}>
      <ActivityIndicator
        size={50}
        color={'#ccc'}
      />
    </View>
    );

  }
  return(
    signed ? <AppRoutes/> : <AuthRoutes/>
  );
}

export default Routes;
