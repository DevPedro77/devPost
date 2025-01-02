import React, { useContext, useState } from 'react';
import { TextInput, TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';
import { Container, Title, Input, Button, ButtonText, Footer, FooterLink } from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { AuthContext } from '../../contexts/auth';

function Login() {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { signUp, signIn, loadingAuth } = useContext(AuthContext);

  // Alternar entre login e criação de conta
  function toggleLogin() {
    setLogin(!login);
    setEmail('');
    setName('');
    setPassword('');
  }

  // Logar usuário
  async function handleSignIn() {
    if (email === '' || password === '') {
      console.log('Preencha todos os campos!');
      return;
    }

    await signIn(email, password);
  }

  // Cadastro de conta
  async function handleSignUp() {
    if (email === '' || name === '' || password === '') {
      console.log('Preencha todos os campos!');
      return;
    }

    await signUp(email, password, name);
  }

  if (login) {
    return (
      <Container>
        <MaterialCommunityIcons name="account-circle" size={70} color="#000" />
        <Title>Welcome Back</Title>

        <Input
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor="#aaa"
          keyboardType="email-address"
        />
        <Input
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry={true}
        />

        <Button onPress={handleSignIn}>
          {loadingAuth ? (
            <ActivityIndicator size={30} color={'#fff'} />
          ) : (
            <ButtonText>Continue</ButtonText>
          )}
        </Button>

        <Footer onPress={toggleLogin}>
          <FooterLink>Don't have an account?</FooterLink>
        </Footer>
      </Container>
    );
  }

  return (
    <Container>
      <MaterialCommunityIcons name="account-circle" size={70} color="#000" />
      <Title>Create an Account</Title>

      <Input
        placeholder="Name"
        placeholderTextColor="#aaa"

        keyboardType="name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Input
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
      />
      <Input
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry={true}
      />

      <Button onPress={handleSignUp}>
        {loadingAuth ? (
          <ActivityIndicator size={25} color={'#fff'} />
        ) : (
          <ButtonText>Continue</ButtonText>
        )}
      </Button>

      <Footer onPress={toggleLogin}>
        <FooterLink>Sign in</FooterLink>
      </Footer>
    </Container>
  );
}

export default Login;
