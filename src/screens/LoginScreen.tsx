import React, { useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import FormInput from '../components/FormInput'; // vou adaptar para receber estilos
import PrimaryButton from '../components/PrimaryButton';
import { API_URL } from '../services/config';

const Container = styled.View`
  flex: 1;
  background-color: white;
  padding: 24px 20px;
  justify-content: center;
`;

const Title = styled.Text`
  font-family: 'Montserrat-Bold';
  font-size: 28px;
  color: black;
  text-align: left;
  margin-bottom: 8px;
`;

const Subtitle = styled.Text`
  font-family: 'Montserrat-Regular';
  font-size: 16px;
  color: #333333;
  text-align: left;
  margin-bottom: 32px;
`;

const StyledFormInput = styled(FormInput)`
  background-color: white;
  border: 1px solid black;
  margin-bottom: 12px;
  color: black;
`;

const ForgotPasswordContainer = styled.View`
  width: 100%;
  align-items: flex-end;
  margin-bottom: 24px;
`;

const ForgotPasswordText = styled.Text`
  color: #000;
  font-family: 'Montserrat-Regular';
  font-size: 14px;
`;

const StyledPrimaryButton = styled(PrimaryButton)`
  background-color: black;
  margin-bottom: 20px;
`;

const RegisterContainer = styled.View`
  align-items: center;
`;

const RegisterText = styled.Text`
  color: #000;
  font-family: 'Montserrat-Regular';
  font-size: 16px;
`;

interface Props {
  navigation: any;
}

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        Alert.alert('Erro', data.message || 'Erro ao fazer login');
        return;
      }
  
      const userToSend = {
        id: data.user.id,
        first_name: data.user.first_name || data.user.firstName || '',
        last_name: data.user.last_name || data.user.lastName || '',
        email: data.user.email || '',
        profile_image: data.user.profile_image || data.user.profileImage || null,
      };
  
      navigation.navigate('Home', { user: userToSend });
  
    } catch (error) {
      Alert.alert('Erro', 'Erro de conexão');
    }
  }

  return (
    <Container>
      <Title>Bem-vindo de volta!</Title>
      <Subtitle>
        Acesse sua conta para acompanhar artigos exclusivos, favoritar e muito mais.
      </Subtitle>

      <StyledFormInput 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <StyledFormInput 
        placeholder="Senha" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
      />

      <ForgotPasswordContainer>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <ForgotPasswordText>Esqueceu a senha?</ForgotPasswordText>
        </TouchableOpacity>
      </ForgotPasswordContainer>

      <StyledPrimaryButton title="Login" onPress={handleLogin} />

      <RegisterContainer>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <RegisterText>Novo usuário? Clique aqui</RegisterText>
        </TouchableOpacity>
      </RegisterContainer>
    </Container>
  );
}
