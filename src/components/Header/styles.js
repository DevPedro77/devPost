import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background-color: #000;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 3% 5%; /* Padding em porcentagem */
`;

export const IconWrapper = styled.View`
  padding-right: 3%; /* Espaço proporcional */
`;

export const LogoutButton = styled.TouchableOpacity`
  padding: 2% 5%; /* Padding em porcentagem */
  border-radius: 5%; /* Raio proporcional */
  align-items: center;
  justify-content: center;
`;
