import React, { useState, useEffect } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styled from 'styled-components/native';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import { API_URL } from '../services/config';

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  justify-content: center;
  padding: 20px;
`;

const Title = styled.Text`
  color: #000000;
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
  color: #000000;
  text-align: center;
  margin-bottom: 10px;
`;

interface Props {
  navigation: any;
  route: any;
}

export default function EditProfileScreen({ navigation, route }: Props) {
  const user = route.params?.user;

  const [isValidUser, setIsValidUser] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [password] = useState('********');
  const [confirmPassword] = useState('********');

  useEffect(() => {
    if (!user) {
      Alert.alert('Erro', 'Usuário não identificado');
      setIsValidUser(false);
      navigation.goBack();
    } else {
    console.log('USUÁRIO RECEBIDO EM EditProfileScreen:', user);
      setFirstName(user.first_name || '');
      setLastName(user.last_name || '');
      setEmail(user.email || '');
      setProfileImage(user.profile_image || null);
    }
  }, [user, navigation]);

  if (!isValidUser || !user) {
    return null;
  }

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

  async function handleUpdateProfile() {
    if (!firstName || !lastName) {
      Alert.alert('Erro', 'Nome e sobrenome são obrigatórios');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: user.id,
          first_name: firstName,
          last_name: lastName,
          profile_image: profileImage,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert('Erro', data.message || 'Erro ao atualizar');
        return;
      }

      Alert.alert('Sucesso', 'Perfil atualizado!');

      const updatedUser = {
        ...user,
        first_name: firstName,
        last_name: lastName,
        profile_image: profileImage,
      };

      navigation.navigate('Home', { user: updatedUser });
    } catch (error) {
      Alert.alert('Erro', 'Erro de conexão');
    }
  }

  return (
    <Container>
      <Title>Editar Perfil</Title>

      <TouchableOpacity onPress={pickImage}>
        {profileImage ? (
          <ProfileImage source={{ uri: profileImage }} />
        ) : (
          <UploadText>Selecionar Imagem de Perfil</UploadText>
        )}
      </TouchableOpacity>

      <FormInput placeholder="Nome" value={firstName} onChangeText={setFirstName} />
      <FormInput placeholder="Sobrenome" value={lastName} onChangeText={setLastName} />
      <FormInput placeholder="Email" value={email} editable={false} />
      <FormInput placeholder="Senha" value={password} secureTextEntry editable={false} />
      <FormInput placeholder="Confirmar Senha" value={confirmPassword} secureTextEntry editable={false} />

      <PrimaryButton title="Salvar Alterações" onPress={handleUpdateProfile} />
    </Container>
  );
}
