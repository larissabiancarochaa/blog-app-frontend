import React, { useState } from 'react';
import { Alert, Image, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
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

const ProfileImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  align-self: center;
  margin-bottom: 20px;
`;

const UploadText = styled.Text`
  color: #fff;
  text-align: center;
  margin-bottom: 10px;
`;

interface Props {
  navigation: any;
}

export default function RegisterScreen({ navigation }: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled && result.assets?.[0]?.base64) {
      setProfileImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  }

  async function handleRegister() {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    try {
      const res = await fetch('http://192.168.0.21:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          confirmPassword,
          profile_image: profileImage, 
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert('Erro', data.message || 'Erro ao cadastrar');
        return;
      }

      Alert.alert('Sucesso', 'Usuário criado!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Erro', 'Erro de conexão');
    }
  }

  return (
    <Container>
      <Title>Cadastro</Title>

      <TouchableOpacity onPress={pickImage}>
        {profileImage ? (
          <ProfileImage source={{ uri: profileImage }} />
        ) : (
          <UploadText>Selecionar Imagem de Perfil</UploadText>
        )}
      </TouchableOpacity>

      <FormInput placeholder="Nome" value={firstName} onChangeText={setFirstName} />
      <FormInput placeholder="Sobrenome" value={lastName} onChangeText={setLastName} />
      <FormInput placeholder="Email" value={email} onChangeText={setEmail} />
      <FormInput placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />
      <FormInput placeholder="Confirmar Senha" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
      <PrimaryButton title="Cadastrar" onPress={handleRegister} />
    </Container>
  );
}