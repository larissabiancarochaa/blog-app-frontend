import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import { API_URL } from '../services/config';

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
    <Container>
      <Title>Resetar senha</Title>
      <FormInput placeholder="Email" value={email} onChangeText={setEmail} />
      <FormInput placeholder="Nova senha" value={newPassword} onChangeText={setNewPassword} secureTextEntry />
      <PrimaryButton title="Atualizar senha" onPress={handleResetPassword} />
    </Container>
  );
}