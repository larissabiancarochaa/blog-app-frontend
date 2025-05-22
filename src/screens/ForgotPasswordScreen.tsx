import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';

const Container = styled.View`
  flex: 1;
  background-color: #121212;
  justify-content: center;
  padding: 20px;
`;

const Title = styled.Text`
  color: white;
  font-family: 'Montserrat-Bold';
  font-size: 28px;
  margin-bottom: 20px;
  text-align: center;
`;

interface Props {
  navigation: any;
}

export default function ForgotPasswordScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');

  async function handleForgotPassword() {
    try {
      const res = await fetch('http://192.168.0.21:3000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert('Erro', data.message || 'Erro ao solicitar recuperação');
        return;
      }

      Alert.alert('Sucesso', 'Verifique seu email para resetar a senha');
      navigation.navigate('ResetPassword');
    } catch (error) {
      Alert.alert('Erro', 'Erro de conexão');
    }
  }

  return (
    <Container>
      <Title>Esqueci minha senha</Title>
      <FormInput placeholder="Email" value={email} onChangeText={setEmail} />
      <PrimaryButton title="Enviar" onPress={handleForgotPassword} />
    </Container>
  );
}