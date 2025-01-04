import React, {useContext} from 'react';
import { Container, Title, IconWrapper, LogoutButton } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { AuthContext } from '../../contexts/auth';

function Header() {
  const {signOut} = useContext(AuthContext);

  function onLogout(){
    signOut();
  }
  return (
    <Container>
      <IconWrapper>
        <Icon name="x-twitter" size={24} color="#fff" />
      </IconWrapper>
      <LogoutButton onPress={onLogout}>
        <Icon name="arrow-right-from-bracket" size={20} color="#FFF" />
      </LogoutButton>
    </Container>
  );
}

export default Header;
