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

const LinkText = styled.Text`
  color: #10a3b9;
  font-family: 'Montserrat-Regular';
  margin-top: 16px;
  text-align: center;
`;

interface Props {
  navigation: any;
}

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    try {
      const res = await fetch('http://192.168.0.21:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        Alert.alert('Erro', data.message || 'Erro ao fazer login');
        return;
      }
  
      console.log('Usuário logado:', data.user); // DEBUG: veja como é o objeto user
  
      // Extrair os campos que você quer passar para Home
      const userToSend = {
        id: data.user.id,
        first_name: data.user.first_name || data.user.firstName || '',
        last_name: data.user.last_name || data.user.lastName || '',
        email: data.user.email || '',
        profile_image: data.user.profile_image || data.user.profileImage || null,
        // inclua aqui outros campos que achar importante
      };
  
      navigation.navigate('Home', { user: userToSend });
  
    } catch (error) {
      Alert.alert('Erro', 'Erro de conexão');
    }
  } 

  return (
    <Container>
      <Title>Login</Title>
      <FormInput placeholder="Email" value={email} onChangeText={setEmail} />
      <FormInput placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />
      <PrimaryButton title="Entrar" onPress={handleLogin} />
      <LinkText onPress={() => navigation.navigate('ForgotPassword')}>
        Esqueci minha senha
      </LinkText>
      <LinkText onPress={() => navigation.navigate('Register')}>
        Não tem conta? Cadastre-se
      </LinkText>
    </Container>
  );
}