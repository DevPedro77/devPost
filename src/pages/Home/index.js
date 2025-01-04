import React, {useState, useContext, useCallback} from 'react';
import {View ,Text, ActivityIndicator} from 'react-native';
import { useNavigation, useFocusEffect} from '@react-navigation/native';
import {Container, ButtonPost, ListPost} from './styles';
import firestore, { orderBy } from '@react-native-firebase/firestore';
import PostList from '../../components/PostList';
import Feather from 'react-native-vector-icons/Feather';
import Header from '../../components/Header';
import { AuthContext } from '../../contexts/auth';


function Home(){
  const navigation = useNavigation();
  const {user} = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback( () => {
      let isActive = true;

      function featchPost(){
        firestore().collection('posts')
        .orderBy('created', 'desc')
        .get()
        .then((snapshot) =>{
          if(isActive){
            setPosts([]);
            const postList = [];
            snapshot.docs.map(u => {
              postList.push({
                ...u.data(),
                id: u.id,
              });
            });

            setPosts(postList);
            setLoading(false);
          }
        });
      }
      featchPost();

      return ()=>{
        console.log('desmontou');
        isActive = false;
      };
    },[])
  );
  return(
    <Container>
      <Header/>

    {loading ? (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={50} color={'#fff'}/>
      </View>
    ) : (
      <ListPost
      showVerticalScrollIndicator={false}
      data={posts}
      renderItem={ ({item}) =>(
        <PostList
          data={item}
          userId = {user?.uid}
        />
      )}
    />
    )}

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
