import React, {useLayoutEffect, useState, useCallback, useContext}from 'react';
import {View ,Text, ActivityIndicator} from 'react-native';
import { useRoute, useNavigation, useFocusEffect} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { Container, ListPosts } from './styles';
import PostList from '../../components/PostList';
import { AuthContext } from '../../contexts/auth';

function PostUsers(){
  const route = useRoute();
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();
  const [title, setTitle] = useState(route.params?.title);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() =>{
    navigation.setOptions({
      title: title === '' ? '' : title,
    });
  },[navigation, title]);

useFocusEffect(
  useCallback( () => {
    let isActive = true;
    firestore()
    .collection('posts')
    .where('userId', '==', route.params?.userId)
    .orderBy('created', 'desc')
    .get()
    .then((snapshot)=>{
      const postList = [];

      snapshot.docs.map(u  => {
      postList.push({
        ...u.data(),
        id: u.id,
      });
      });

      if(isActive) {
        console.log(postList);
        setLoading(false);
        setPosts(postList);
      }
    });

    return () => {
      isActive = false;
    };
  },[])
);


  return(
    <Container>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={50} color={'#fff'} />
        </View>
      ) : (
        <ListPosts
        showsVerticalScrollIndicator={false}
          data={posts}
          renderItem={ ({item}) => <PostList data={item} userId={user.uid}/>}
        />
      )}
    </Container>
  );
}

export default PostUsers;
