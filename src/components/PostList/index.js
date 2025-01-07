import React, {useState} from 'react';
import { View } from 'react-native';
import {
  Container,
  Name,
  Avatar,
  ContentView,
  Content,
  Header,
  Actions,
  LikeButton,
  Like,
  TimePost,
} from './styles';
import firestore  from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatDate, formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';


function PostList({data, userId}) {
  const[likePost, setLikePost] = useState(data?.likes);
  const navigation = useNavigation();

function formatTimePost(){
  //console.log(new Date(data.created.seconds * 1000));
  const datePost = new Date(data.created.seconds * 1000);
  return formatDistance(
    new Date(),
    datePost,
    {
      locale: ptBR,
    }
  );
}

async function handleLikePost(id, likes){
  const docID = `${userId}_${id}`;

  //chegar se o post foi curtido
  const doc = await firestore().collection('likes')
  .doc(docID).get();

  //verificar se existe
  if(doc.exists){
    //voce já curtiu e ja existe o like e precisamos remover o like
    await firestore().collection('posts')
    .doc(id).update({
      likes: likes - 1,
    });

    await firestore().collection('likes').doc(docID)
    .delete()
    .then( () =>{
      setLikePost(likes - 1);
    });

    return;
  }

  // precisamos dar o like no post
  await firestore().collection('likes')
  .doc(docID).set({
    postId: id,
    userId: userId,
  });

  await firestore().collection('posts')
  .doc(id).update({
    likes: likes + 1,
  })
  .then(() =>{
    setLikePost(likes + 1);
  });
}


  return (
    <Container>
      <Header onPress={() => navigation.navigate('PostUser', {title: data?.autor, userId: data?.userId})}>
        <Avatar
          source={require('../../assets/avatar.png')}
        />
          <Name numberOfLines={1}>
            {data?.autor}
          </Name>
      </Header>

      <ContentView>
        <Content>{data?.content}</Content>
      </ContentView>

      <Actions>
        <LikeButton onPress={() => handleLikePost(data.id, likePost)}>
          <Like>
            {likePost === 0 ? '' : likePost}
          </Like>
          <MaterialCommunityIcons
            name={likePost === 0 ? 'heart-outline' : 'cards-heart'}
            size={20}
            color={'#E53935'}
          />

        </LikeButton>

        <TimePost>
          {formatTimePost()}
        </TimePost>
      </Actions>
    </Container>
  );
}

export default PostList;
