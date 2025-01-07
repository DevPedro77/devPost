import styled from 'styled-components';

export const Container = styled.View`
  margin-top: 8px;
  margin: 8px 2%;
  background-color: rgba(0, 0, 0, 0.6); /* Fundo levemente transparente */
  border-radius: 8px;
  padding: 12px;
`;

export const Header = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 6px;
`;

export const Name = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;
export const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 7px;
`;
export const ContentView = styled.View`

`;
export const Content = styled.Text`
  color: #fff;
  margin: 4px;
`;

export const Actions = styled.View`
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  
`;

export const LikeButton = styled.TouchableOpacity`
  width: 45px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
export const Like = styled.Text`
  color: #fff;
  margin-right: 6px;
`;
export const TimePost = styled.Text`
  color: #fff;
`;



