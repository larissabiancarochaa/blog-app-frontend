import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import { API_URL } from '../services/config';

const Container = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
  padding: 24px 20px;
`;

const ContentWrapper = styled.View`
  flex: 1;
  justify-content: center;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

const BackButton = styled.TouchableOpacity`
  padding: 8px;
  margin-right: 8px;
`;

const Title = styled.Text`
  color: #121212;
  font-family: 'Montserrat-Bold';
  font-size: 28px;
`;

const Subtitle = styled.Text`
  color: #444444;
  font-family: 'Montserrat-Regular';
  font-size: 16px;
  text-align: left;
  margin-bottom: 24px;
`;

const StyledFormInput = styled(FormInput)`
  background-color: #f5f5f5;
  border: 1px solid #cccccc;
  margin-bottom: 16px;
  color: black;
`;

interface Props {
  navigation: any;
}

export default function ResetPasswordScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  async function handleResetPassword() {
    try {
      const res = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert('Erro', data.message || 'Erro ao resetar senha');
        return;
      }

      Alert.alert('Sucesso', 'Senha atualizada');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Erro', 'Erro de conexão');
    }
  }

  return (
    <Container contentContainerStyle={{ flexGrow: 1 }}>
      <ContentWrapper>
        <Header>
          <BackButton onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#121212" />
          </BackButton>
          <Title>Resetar senha</Title>
        </Header>

        <Subtitle>
          Digite seu e-mail e escolha uma nova senha para acessar sua conta.
        </Subtitle>

        <StyledFormInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <StyledFormInput
          placeholder="Nova senha"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
        <PrimaryButton title="Atualizar senha" onPress={handleResetPassword} />
      </ContentWrapper>
    </Container>
  );
}
