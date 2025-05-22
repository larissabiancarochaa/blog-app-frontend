import React, { useState, useEffect } from 'react';
import { Alert, ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import * as ImagePicker from 'expo-image-picker';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';

const Container = styled.View`
  flex: 1;
  background-color: #121212;
  padding: 20px;
`;

const Title = styled.Text`
  color: white;
  font-family: 'Montserrat-Bold';
  font-size: 28px;
  margin-bottom: 20px;
  text-align: center;
`;

const ImagePreview = styled.Image`
  width: 100%;
  height: 200px;
  margin-bottom: 16px;
  border-radius: 8px;
`;

const UploadText = styled.Text`
  color: #fff;
  text-align: center;
  margin-bottom: 10px;
`;

interface Props {
  navigation: any;
  route: any;
}

export default function AddPostScreen({ navigation, route }: Props) {
  const user = route.params?.user;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      Alert.alert('Erro', 'Usuário não identificado');
      navigation.goBack();
    }
  }, [user]);

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled && result.assets?.[0]?.base64) {
      setImageBase64(`data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  }

  async function handleAddPost() {
    if (!title || !content) {
      Alert.alert('Erro', 'Título e conteúdo são obrigatórios');
      return;
    }

    // Gerar número aleatório de 0 a 99 para likes
    const randomLikes = Math.floor(Math.random() * 100);

    try {
      const res = await fetch('http://192.168.0.21:3000/api/posts/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,         // enviando 'content'
          image: imageBase64,
          author_id: user?.id,
          likes: randomLikes,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('Erro ao adicionar artigo:', data.message);
        Alert.alert('Erro', data.message || 'Não foi possível adicionar esse artigo');
        return;
      }

      Alert.alert('Sucesso', 'Artigo adicionado com sucesso');
      navigation.navigate('Home', { user });
    } catch (error) {
      console.error('Erro de conexão:', error);
      Alert.alert('Erro', 'Não foi possível adicionar esse artigo');
    }
  }

  return (
    <ScrollView>
      <Container>
        <Title>Novo Artigo</Title>

        <TouchableOpacity onPress={pickImage}>
          {imageBase64 ? (
            <ImagePreview source={{ uri: imageBase64 }} />
          ) : (
            <UploadText>Selecionar Imagem do Artigo</UploadText>
          )}
        </TouchableOpacity>

        <FormInput placeholder="Título" value={title} onChangeText={setTitle} />
        <FormInput
          placeholder="Conteúdo"
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={6}
          style={{ height: 120, textAlignVertical: 'top' }}
        />

        <PrimaryButton title="Publicar Artigo" onPress={handleAddPost} />
      </Container>
    </ScrollView>
  );
}