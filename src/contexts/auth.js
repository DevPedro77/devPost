import React, {createContext, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

function AuthProvider({children}){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingAuth, setLoadingAuth] = useState(false);

  useEffect( () =>{
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem('@devapp');

      if(storageUser){
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }

      setLoading(false);
    }
    loadStorage();
  },[]);

  // criando a conta do usuario no banco de dados
  async function signUp(email, password, name){
    setLoadingAuth(true);

    await auth().createUserWithEmailAndPassword(email, password)
    .then(async(value) => {
      let uid = value.user.uid;
      await firestore().collection('users')
      .doc(uid).set({
        nome: name,
        email: email,
        createdAt: new Date(),
      })
      .then(() =>{
        let data = {
          uid: uid,
          nome: name,
          email: email,
        };

        setUser(data);
        storageUser(data);
        setLoadingAuth(false);
      });

    })
    .catch((err)=>{
      console.log(err);
      setLoadingAuth(false);
    });
  }
// Fazendo login do usuario
  async function signIn(email, password) {
    setLoadingAuth(true);
    await auth().signInWithEmailAndPassword(email,password)
    .then(async(value)=>{
      let uid = value.user.uid;

      const userProfile = await firestore().collection('users')
      .doc(uid).get();

      let data = {
        uid: uid,
        nome: userProfile.data().nome,
        email: value.user.email,
      };
      setUser(data);
      storageUser(data);
      setLoadingAuth(false);

    })



    .catch((error) => {
      console.log(error);
      setLoadingAuth(false);
    });
  }

  async function signOut() {
    await auth().signOut();
    await AsyncStorage.clear()
    .then( ()=>{
      setUser(null);
    });
  }
// armazenando o login em storage
  async function storageUser(data) {
    await AsyncStorage.setItem('@devapp', JSON.stringify(data));
  }

  return(
    <AuthContext.Provider
    value={{ signed: !!user, signUp, signIn, signOut, loadingAuth, loading, user, setUser, storageUser}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
