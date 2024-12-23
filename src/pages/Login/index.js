import React, {useState} from 'react';
import { TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { Container, Title, Input, Button, ButtonText, Footer, FooterLink } from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function Login() {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  //alternar entre login e criação de conta
  function toggleLogin(){
    setLogin(!login);
    setEmail('');
    setName('');
    setPassword('');
  }
//Logar seu usuario
  function handleSignIn(){
    if(email === '' || password == ''){
      console.log('Preencha todos os campos!');
      return;
    }
    // fazer login
  }
//Cadastro de conta
  function handleSignUp(){
    if(email === '' || name === '' || password === ''){
      console.log('Preencha todos os campos!');
      return;
    }

    // criar a conta
  }


  if(login){
    return (
      <Container>
        <FontAwesome name="user-secret" size={70} color="#000" />
        <Title>Welcome Back</Title>

        <Input
          placeholder="Email"
          value={email}
          onChangeText={ (text) => setEmail(text)}
          placeholderTextColor="#aaa"
          keyboardType="email-address"
        />
        <Input
          value={password}
          onChangeText={ (text) => setPassword(text)}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
        />

        <Button onPress={handleSignIn}>
          <ButtonText>Continue</ButtonText>
        </Button>

        <Footer onPress={toggleLogin}>
          <FooterLink>Don't have acconut?</FooterLink>
        </Footer>
      </Container>
    );
  }

  return (
    <Container>
      <FontAwesome name="user-secret" size={70} color="#000" />
      <Title>Create an Account</Title>

      <Input
        placeholder="Name"
        placeholderTextColor="#aaa"
        keyboardType="name"
        value={name}
        onChangeText={ (text) => setName(text)}
      />
      <Input
        value={email}
        onChangeText={ (text) => setEmail(text)}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
      />
      <Input
        value={password}
        onChangeText={ (text) => setPassword(text)}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
      />

      <Button onPress={handleSignUp}>
        <ButtonText>Continue</ButtonText>
      </Button>

      <Footer  onPress={toggleLogin}>
        <FooterLink>Sign in</FooterLink>
      </Footer>
    </Container>
  );

}

export default Login;
