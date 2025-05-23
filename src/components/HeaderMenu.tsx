import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Image } from 'react-native';

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 16px 20px;
`;

const MenuText = styled.Text`
  color: #000;
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
  navigateTo: (screen: string, params?: object) => void;
  profileImage: string | null;
  user?: any;
}

// Função para garantir que a string base64 tem prefixo válido
function formatBase64Image(uri: string) {
  if (uri.startsWith('data:image')) {
    return uri; // já está no formato correto
  }
  // Supondo jpeg — pode mudar para png se for outro formato
  return `data:image/jpeg;base64,${uri}`;
}

export default function HeaderMenu({ onProfilePress, navigateTo, profileImage, user }: HeaderProps) {
  console.log('profileImage recebido em HeaderMenu:', profileImage);
  
  const imageSource = profileImage
    ? { uri: formatBase64Image(profileImage) }
    : require('../assets/default-profile.png');

  return (
    <HeaderContainer>
      <MenuLeft>
        <TouchableOpacity onPress={() => navigateTo('Home', { user })}>
          <MenuText>HOME</MenuText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('Articles', { user })}>
          <MenuText>ARTIGOS</MenuText>
        </TouchableOpacity>
      </MenuLeft>

      <TouchableOpacity onPress={onProfilePress}>
        <Image
          source={imageSource}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
      </TouchableOpacity>
    </HeaderContainer>
  );
}
