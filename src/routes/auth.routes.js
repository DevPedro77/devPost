import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../pages/Login';
const Stack = createNativeStackNavigator();

function AuthRoutes(){
  return(
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
      />
    </Stack.Navigator>
  );
}

export default AuthRoutes;
