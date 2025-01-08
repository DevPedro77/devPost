import React from 'react';
import { Container, Name } from './styles';
import { useNavigation } from '@react-navigation/native';

function SearchList({data}) {
  const navigation = useNavigation();

  function handleNavigation (){
    navigation.navigate('HomeTab', {
      screen: 'PostUser',
      params: { title: data.nome, userId: data.id },
    });
  }
return (
    <Container onPress={handleNavigation}>
      <Name>{data.nome}</Name>
    </Container>
  );
}

export default SearchList;
