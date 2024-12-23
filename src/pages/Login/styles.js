import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #000;
  margin: 16px;
`;

export const Input = styled.TextInput`
  width: 90%;
  height: 50px;
  background-color: #f0f0f0;
  border-radius: 8px;
  margin-bottom: 15px;
  padding: 0 15px;
  font-size: 16px;
  color: #000;
`;

export const Button = styled.TouchableOpacity`
  width: 90%;
  height: 50px;
  background-color: #000;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const ButtonText = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
`;
export const Footer = styled.TouchableOpacity`
  margin-top: 12px;
`;

export const FooterLink = styled.Text`
  font-size: 16px;
  color: #000;
  font-weight: bold;
`;
