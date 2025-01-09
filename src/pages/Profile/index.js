import React, { useContext, useState } from 'react';
import { View, Text, Modal, Platform } from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

import { AuthContext } from '../../contexts/auth';
import firestore from '@react-native-firebase/firestore';
import Header from '../../components/Header';
import {
  Container,
  ContainerItems,
  Name,
  Email,
  Button,
  ButtonText,
  UploadButton,
  UploadText,
  Avatar,
  ModalContainer,
  ButtonBack,
  Input,
} from './styles';
import Feather from 'react-native-vector-icons/Feather';

function Profile(){
  const { signOut, user, setUser, storageUser } = useContext(AuthContext);

  const [nome, setNome] = useState(user?.nome);
  const [url, setUrl] = useState(null);
  const [open, setOpen] = useState(false);

  async function handleSignOut(){
    await signOut();
  }
  // atualizar perfil
  async function updateProfile() {
  if (nome === '') {
    return;
  }

  // Atualizar o nome do usuário no Firestore
  await firestore().collection('users')
    .doc(user?.uid)
    .update({
      nome: nome,
    });

  // Buscar posts relacionados ao usuário
  const postDocs = await firestore().collection('posts')
    .where('userId', '==', user?.uid).get();

  // Percorrer e atualizar os autores dos posts
  for (const doc of postDocs.docs) { // Usando "for...of" para iterar
    await firestore().collection('posts').doc(doc.id).update({
      autor: nome,
    });
  }

  // Atualizar o estado do contexto do usuário
  let data = {
    uid: user.uid,
    nome: nome,
    email: user.email,
  };

  setUser(data);
  storageUser(data);
  setOpen(false);
}

const uploadFile = () => {
  const options = {
    noData: true,
    mediaType: 'photo',

  };
  launchImageLibrary( options, response => {
    if(response.didCancel){
      console.log('cancelou');
    }else if(response.error){
      console.log('Ops, deu algum erro');
    }else {
      console.log('enviar ao cloudyfire')
    }
  });
};


  return(
    <Container>
      <Header/>
    <ContainerItems>

      { url ? (
        <UploadButton onPress={ () => alert('CLICOU 1') }>
          <UploadText>+</UploadText>
          <Avatar
            source={{ uri: url }}
          />
        </UploadButton>
      ) : (
        <UploadButton onPress={ () => uploadFile() }>
          <UploadText>+</UploadText>
        </UploadButton>
      )}

      <Name>{user?.nome}</Name>
      <Email>{user?.email}</Email>

      <Button bg="#428cfd" onPress={() => setOpen(true)}>
        <ButtonText color="#FFF">Atualizar Perfil</ButtonText>
      </Button>

      <Button bg="#ddd" onPress={ handleSignOut }>
        <ButtonText color="#353840">Sair</ButtonText>
      </Button>
      <Modal visible={open} animationType="slide" transparent={true}>
        <ModalContainer behavior={Platform.OS === 'android' ? '' : 'padding'}>
          <ButtonBack onPress={() => setOpen(false)}>
              <Feather
                name="arrow-left"
                size={22}
                color="#121212"
              />
              <ButtonText color="#121212">Voltar</ButtonText>
          </ButtonBack>

          <Input
            placeholder={user?.nome}
            value={nome}
            onChangeText={ (text) => setNome(text)}

          />
          <Button bg="#428cfd" onPress={updateProfile}>
            <ButtonText color="#FFF">Salvar</ButtonText>
          </Button>
        </ModalContainer>
      </Modal>
    </ContainerItems>

    </Container>
  );
}

export default Profile;
