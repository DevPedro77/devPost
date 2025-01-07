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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatDate, formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';

function PostList({data, userId}) {
  const[likePost, setLikePost] = useState(data?.likes);

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


  return (
    <Container>
      <Header>
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
        <LikeButton>
          <Like>
            {likePost === 0 ? '' : likePost}
          </Like>
          <MaterialCommunityIcons
            name={likePost === 0 ? 'heart-outline' : 'cards-heart'}
            size={20}
            color={'red'}
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
