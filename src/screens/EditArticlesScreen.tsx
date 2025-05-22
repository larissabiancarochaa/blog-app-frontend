import React, { useEffect, useState } from 'react';
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

export default function EditarArtigo({ navigation, route }: Props) {
  const { article } = route.params;

  const [title, setTitle] = useState(article.title || '');
  const [content, setContent] = useState(article.description || '');
  const [imageBase64, setImageBase64] = useState<string | null>(article.image || null);

  useEffect(() => {
    if (!article) {
      Alert.alert('Erro', 'Dados do artigo não encontrados');
      navigation.goBack();
    }
  }, []);

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

  async function handleUpdatePost() {
    if (!title || !content) {
      Alert.alert('Erro', 'Título e conteúdo são obrigatórios');
      return;
    }

    try {
      const res = await fetch(`http://192.168.0.21:3000/api/posts/update/${article.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          image: imageBase64,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert('Erro', data.message || 'Erro ao atualizar o artigo');
        return;
      }

      Alert.alert('Sucesso', 'Artigo atualizado com sucesso');
      navigation.goBack();
    } catch (error) {
      console.error('Erro de conexão:', error);
      Alert.alert('Erro', 'Erro ao atualizar o artigo');
    }
  }

  return (
    <ScrollView>
      <Container>
        <Title>Editar Artigo</Title>

        <TouchableOpacity onPress={pickImage}>
          {imageBase64 ? (
            <ImagePreview source={{ uri: imageBase64 }} />
          ) : (
            <UploadText>Selecionar nova imagem</UploadText>
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

        <PrimaryButton title="Salvar Alterações" onPress={handleUpdatePost} />
      </Container>
    </ScrollView>
  );
}
