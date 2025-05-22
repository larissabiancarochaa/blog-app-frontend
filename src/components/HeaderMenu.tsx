// components/HeaderMenu.tsx
import React from 'react';
import styled from 'styled-components/native';
import { View, TouchableOpacity, Text, Image } from 'react-native';

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #121212;
  padding: 16px 20px;
`;

const MenuText = styled.Text`
  color: #ffffff;
  font-family: 'Montserrat-Bold';
  font-size: 16px;
  margin-right: 16px;
`;

const MenuLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

interface HeaderProps {
  onProfilePress: () => void;
  navigateTo: (screen: string) => void;
  profileImage: string | null;
}

export default function HeaderMenu({ onProfilePress, navigateTo, profileImage }: HeaderProps) {
  return (
    <HeaderContainer>
      <MenuLeft>
        <TouchableOpacity onPress={() => navigateTo('Welcome')}> 
          <MenuText>HOME</MenuText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('Articles')}>
          <MenuText>ARTIGOS</MenuText>
        </TouchableOpacity>
      </MenuLeft>

      <TouchableOpacity onPress={onProfilePress}>
        <Image
          source={
            profileImage
              ? { uri: `http://192.168.0.21:3000/uploads/${profileImage}` }
              : require('../assets/default-profile.png')
          }
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
      </TouchableOpacity>
    </HeaderContainer>
  );
}