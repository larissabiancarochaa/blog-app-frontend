import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.ScrollView`
  flex: 1;
  padding: 16px;
`;

const PostImage = styled.Image`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const PostTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  font-family: 'Montserrat-Bold';
`;

const PostContent = styled.Text`
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 16px;
  font-family: 'Montserrat-Regular';
`;

const AuthorInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
`;

const AuthorImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 12px;
`;

const AuthorName = styled.Text`
  font-size: 14px;
  font-family: 'Montserrat-Italic';
`;

export default function PostDetailScreen({ route }: any) {
  // Em uma implementação real, você buscaria o post completo pelo ID
  const { postId } = route.params;
  
  // Isso é apenas para demonstração - você deve buscar o post real da API
  const post = {
    id: postId,
    title: 'Título do Post',
    description: 'Conteúdo completo do post aqui...',
    image: 'https://via.placeholder.com/400x200',
    first_name: 'Autor',
    last_name: 'Desconhecido',
    profile_image: 'https://via.placeholder.com/100'
  };

  return (
    <Container>
      {post.image && <PostImage source={{ uri: post.image }} />}
      <PostTitle>{post.title}</PostTitle>
      <PostContent>{post.description}</PostContent>
      
      <AuthorInfo>
        <AuthorImage source={{ uri: post.profile_image }} />
        <AuthorName>Por {post.first_name} {post.last_name}</AuthorName>
      </AuthorInfo>
    </Container>
  );
}