import React from 'react';
import styled from 'styled-components/native';
import { Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ModalContainer = styled.View`
  flex: 1;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
  right: 30px;
  z-index: 10;
`;

const OptionButton = styled.TouchableOpacity`
  background-color: #fff;
  padding: 16px 32px;
  margin: 12px 0;
  border-radius: 10px;
  width: 80%;
  align-items: flex-end;
`;

const OptionText = styled.Text`
  color: #000;
  font-family: 'Montserrat-Bold';
  font-size: 18px;
  text-align: right;
`;

interface Props {
  visible: boolean;
  onClose: () => void;
  navigateTo: (screen: string, params?: object) => void;
  user?: {
    id: number | string;
    first_name?: string;
    last_name?: string;
    email?: string;
    profile_image?: string | null;
  };
}

export default function ProfileMenuModal({ visible, onClose, navigateTo, user }: Props) {
  function handleNavigate(screen: string) {
    onClose();
    setTimeout(() => {
      if ((screen === 'AddPost' || screen === 'EditProfile' || screen === 'MyArticles') && user) {
        navigateTo(screen, { user });
      } else {
        navigateTo(screen);
      }
    }, 300);
  }

  function handleLogout() {
    onClose();
    setTimeout(() => {
      navigateTo('Login');
    }, 300);
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <ModalContainer>
        <CloseButton onPress={onClose}>
          <Ionicons name="close" size={32} color="#000" />
        </CloseButton>

        <OptionButton onPress={() => handleNavigate('EditProfile')}>
          <OptionText>Perfil</OptionText>
        </OptionButton>
        <OptionButton onPress={() => handleNavigate('MyArticles')}>
          <OptionText>Meus Artigos</OptionText>
        </OptionButton>
        <OptionButton onPress={() => handleNavigate('AddPost')}>
          <OptionText>Adicionar Artigo</OptionText>
        </OptionButton>
        <OptionButton onPress={handleLogout}>
          <OptionText>Sair</OptionText>
        </OptionButton>
      </ModalContainer>
    </Modal>
  );
}
