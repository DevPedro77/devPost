import React from 'react';
import {View ,Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Container, ButtonPost} from './styles';
import Feather from 'react-native-vector-icons/Feather';


function Home(){
  const navigation = useNavigation();
  return(
    <Container>
      <Text>TELA HOME</Text>

      <ButtonPost
        onPress={ () => navigation.navigate('NewPost')}
      >
        <Feather
          name="edit-2"
          color= "#fff"
          size={25}
        />
      </ButtonPost>
    </Container>
  );
}

export default Home;
