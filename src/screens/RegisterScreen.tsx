import React, { useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styled from 'styled-components/native';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import { API_URL } from '../services/config';
import { Ionicons } from '@expo/vector-icons';

const Container = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
  padding: 24px 20px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

const BackButton = styled.TouchableOpacity`
  margin-right: 10px;
`;

const Title = styled.Text`
  font-family: 'Montserrat-Bold';
  font-size: 28px;
  color: #000;
`;

const Subtitle = styled.Text`
  font-family: 'Montserrat-Regular';
  font-size: 16px;
  color: #444;
  margin-bottom: 24px;
`;

const ProfileImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  align-self: center;
  margin-bottom: 12px;
`;

const UploadText = styled.Text`
  font-family: 'Montserrat-Regular';
  font-size: 14px;
  color: #000;
  text-align: center;
  margin-bottom: 20px;
`;

const StyledFormInput = styled(FormInput)`
  background-color: white;
  border: 1px solid black;
  margin-bottom: 12px;
  color: black;
`;

const TermsContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const Checkbox = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  border: 1px solid #000;
  margin-right: 10px;
  margin-top: 3px;
  align-items: center;
  justify-content: center;
`;

const Checkmark = styled.View`
  width: 12px;
  height: 12px;
  background-color: black;
`;

const TermsText = styled.Text`
  font-family: 'Montserrat-Regular';
  font-size: 14px;
  color: #333;
  flex: 1;
`;

const RegisterLink = styled.Text`
  font-family: 'Montserrat-Regular';
  font-size: 16px;
  color: #000;
  text-align: center;
  margin-top: 24px;
`;

const ContentWrapper = styled.View`
  flex: 1;
  justify-content: center;
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
  const [agreed, setAgreed] = useState(false);

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

    if (!agreed) {
      Alert.alert('Atenção', 'Você precisa concordar com os Termos de Uso e a Política de Privacidade.');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
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
    <Container showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
      <ContentWrapper>
        <Header>
          <BackButton onPress={() => navigation.navigate('Login')}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </BackButton>
          <Title>Registrar</Title>
        </Header>
  
        <Subtitle>
          Crie sua conta para explorar conteúdos incríveis, seguir autores e participar da comunidade.
        </Subtitle>
  
        <TouchableOpacity onPress={pickImage}>
          {profileImage ? (
            <ProfileImage source={{ uri: profileImage }} />
          ) : (
            <UploadText>Selecionar Imagem de Perfil</UploadText>
          )}
        </TouchableOpacity>
  
        <StyledFormInput placeholder="Nome" value={firstName} onChangeText={setFirstName} />
        <StyledFormInput placeholder="Sobrenome" value={lastName} onChangeText={setLastName} />
        <StyledFormInput placeholder="Email" value={email} onChangeText={setEmail} />
        <StyledFormInput placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />
        <StyledFormInput placeholder="Confirmar Senha" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
  
        <TermsContainer>
          <Checkbox onPress={() => setAgreed(!agreed)}>
            {agreed && <Checkmark />}
          </Checkbox>
          <TermsText>
            Li e concordo com os Termos de Uso e a Política de Privacidade.
          </TermsText>
        </TermsContainer>
  
        <PrimaryButton title="Cadastrar" onPress={handleRegister} />
  
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <RegisterLink>Já tem cadastro? Clique aqui</RegisterLink>
        </TouchableOpacity>
      </ContentWrapper>
    </Container>
  );
  
}
