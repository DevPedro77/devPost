import React, { useState, useLayoutEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { Container, Input, Button, ButtonText } from './styles';
import { AuthContext } from '../../contexts/auth';
import { Alert } from 'react-native';

function NewPost() {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={handlePost}>
          <ButtonText>Compartilhar</ButtonText>
        </Button>
      ),
    });
  }, [navigation, post]);

  async function handlePost() {
    if (post === '') {
      console.log('Post vazio');
      return;
    }

    try {
      await firestore().collection('posts').add({
        created: firestore.FieldValue.serverTimestamp(),
        content: post,
        autor: user?.nome,
        userId: user?.uid,
        likes: 0,
      });

      setPost('');
      console.log('Sucesso', 'Post criado com sucesso!');
    } catch (err) {
      console.log('Erro ao criar post:', err);
      Alert.alert('Erro', 'Não foi possível criar o post');
    }
    navigation.goBack();
  }

  return (
    <Container>
      <Input
        placeholder="O que está acontecendo ?"
        value={post}
        onChangeText={(text) => setPost(text)}
        autoCorrect={false}
        multiline={true}
        placeholderTextColor="#ddd"
        maxLength={280}
      />
    </Container>
  );
}

export default NewPost;
