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
  TimePost
} from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
function PostList({data, userId}) {
  const[likePost, setLikePost] = useState(data?.likes)
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
            name={likePost === 0 ? 'heart-outline': 'cards-heart'}
            size={20}
            color={'#e52246'}
          />

        </LikeButton>

        <TimePost>
          há um minuto
        </TimePost>
      </Actions>
    </Container>
  );
}

export default PostList;
