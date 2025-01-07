import React, {useState, useContext, useCallback} from 'react';
import {View ,Text, ActivityIndicator, Alert} from 'react-native';
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

  const [loadingRefresh, setLoadingRefresh] = useState(false); // refresh do app
  const [lastItem, setLastItem] = useState(''); // ultimo post
  const [emptyList, setEmptyList] = useState(false); // lista vazia

  useFocusEffect(
    useCallback( () => {
      let isActive = true;

      function featchPost(){
        firestore().collection('posts')
        .orderBy('created', 'desc')
        .limit(5)
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

            setEmptyList(!!snapshot.empty);
            setPosts(postList);
            setLastItem(snapshot.docs[snapshot.docs.length - 1]); // aqui tem o ultimo post da flatlist
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
  // Fazendo o refresh do Feed, buscando alteração no banco de dados
async function handleRefreshPost(){
  setLoadingRefresh(true);

  firestore().collection('posts')
  .orderBy('created', 'desc')
  .limit(5)
  .get()
  .then((snapshot) =>{
    setPosts([]);
    const postList = [];

    snapshot.docs.map( u => {
      postList.push({
        ...u.data(),
        id: u.id,
      });
    });

    setEmptyList(false);
    setPosts(postList);
    setLastItem(snapshot.docs[snapshot.docs.length - 1 ]);
    setLoading(false);
  });

  setLoadingRefresh(false);
}
//Buscar mais post ao chegar no final da lista
async function getListPost() {
  if(emptyList){
    setLoading(false);
    return null;
  }

  firestore().collection('posts')
  .orderBy('created', 'desc')
  .limit(5)
  .startAfter( lastItem)
  .get()
  .then((snapshot) =>{
    const postList = [];
    snapshot.docs.map( u =>{
      postList.push({
        ...u.data(),
        id: u.id,
      });
    });
    setEmptyList(!!snapshot.empty);
    setLastItem(snapshot.docs[snapshot.docs.length - 1]);
    setPosts( oldPost => [...oldPost, ...postList]);
    setLoading(false);
  });
}

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

      refreshing={loadingRefresh}
      onRefresh={handleRefreshPost}

      onEndReached={() =>getListPost()}
      onEndReachedThreshold={0.1}
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
