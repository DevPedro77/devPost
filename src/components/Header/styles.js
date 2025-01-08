import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background-color:#0a0a0a;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 4% 5%; 
`;

export const IconWrapper = styled.View`
  padding-left: 3%; 

`;

export const LogoutButton = styled.TouchableOpacity`
  padding: 2% 5%; /* Padding em porcentagem */
  border-radius: 5%; /* Raio proporcional */
  align-items: center;
  justify-content: center;
`;
