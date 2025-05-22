// components/ProfileMenuModal.tsx
import React from 'react';
import styled from 'styled-components/native';
import { Modal, TouchableOpacity } from 'react-native';

const ModalContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.85);
  justify-content: center;
  align-items: center;
`;

const OptionButton = styled.TouchableOpacity`
  background-color: #1e1e1e;
  padding: 16px 32px;
  margin: 10px 0;
  border-radius: 10px;
  width: 80%;
`;

const OptionText = styled.Text`
  color: white;
  font-family: 'Montserrat-Bold';
  font-size: 18px;
  text-align: center;
`;

interface Props {
  visible: boolean;
  onClose: () => void;
  navigateTo: (screen: string) => void;
}

export default function ProfileMenuModal({ visible, onClose, navigateTo }: Props) {
  function handleNavigate(screen: string) {
    onClose();
    navigateTo(screen);
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <ModalContainer>
        <OptionButton onPress={() => handleNavigate('Profile')}>
          <OptionText>Perfil</OptionText>
        </OptionButton>
        <OptionButton onPress={() => handleNavigate('MyArticles')}>
          <OptionText>Meus Artigos</OptionText>
        </OptionButton>
        <OptionButton onPress={() => handleNavigate('AddArticle')}>
          <OptionText>Adicionar Artigo</OptionText>
        </OptionButton>
        <OptionButton onPress={onClose}>
          <OptionText>Fechar</OptionText>
        </OptionButton>
      </ModalContainer>
    </Modal>
  );
}