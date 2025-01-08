import styled from 'styled-components';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #2f3640;
  padding-top: 14px;
`;
export const AreaInput = styled.View`
  flex-direction: row;
  align-items: center;
  background-color:#ffffff;
  margin: 10px;
  border-radius: 5px;
  padding: 5px 10px;
`;
export const Input = styled.TextInput`
  width: 90%;
  background-color: transparent;
  height: 40px;
  padding-left: 8px;
  font-size: 17px;
  color: #121212;
`;

export const List = styled.FlatList`
  flex: 1;
`;