import React, { useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons'; // Certifique-se de ter expo-vector-icons instalado
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

const RegisterLink = styled.Text`
  font-family: 'Montserrat-Regular';
  font-size: 16px;
  color: #000;
  text-align: center;
  margin-top: 24px;
`;

interface Props {
  navigation: any;
}

export default function ForgotPasswordScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');

  async function handleForgotPassword() {
    try {
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert('Erro', data.message || 'Erro ao solicitar recuperação');
        return;
      }

      Alert.alert('Sucesso', 'Verifique seu email para redefinir a senha');
      navigation.navigate('ResetPassword');
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
          <Title>Esqueci a senha</Title>
        </Header>

        <Subtitle>
          Sem problemas! Informe seu e-mail e enviaremos um link para redefinir sua senha.
        </Subtitle>

        <StyledFormInput placeholder="Email" value={email} onChangeText={setEmail} />
        <PrimaryButton title="Enviar" onPress={handleForgotPassword} />

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <RegisterLink>Novo usuário? Clique aqui</RegisterLink>
        </TouchableOpacity>
      </ContentWrapper>
    </Container>
  );
}