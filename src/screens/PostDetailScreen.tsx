import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import styled from 'styled-components/native';
import { API_URL } from '../services/config';

const Container = styled.ScrollView`
  flex: 1;
  padding: 16px;
  background-color: #121212;
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
  color: #fff;
`;

const PostContent = styled.Text`
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 16px;
  font-family: 'Montserrat-Regular';
  color: #e0e0e0;
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
  color: #aaa;
`;

export default function PostDetailScreen({ route, navigation }: any) {
  const { postId } = route.params;
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      try {
        const res = await fetch(`${API_URL}/api/posts/${postId}`);
        const data = await res.json();

        if (!res.ok) {
          Alert.alert('Erro', data.message || 'Erro ao carregar o post');
          navigation.goBack();
          return;
        }

        setPost(data);
      } catch (error) {
        console.error('Erro ao buscar o post:', error);
        Alert.alert('Erro', 'Erro ao carregar o post');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [postId]);

  if (loading) {
    return (
      <Container contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#10A3B9" />
      </Container>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <Container>
      {post.image && <PostImage source={{ uri: post.image }} />}
      <PostTitle>{post.title}</PostTitle>
      <PostContent>{post.description}</PostContent>

      <AuthorInfo>
        <AuthorImage source={{ uri: post.profile_image || 'https://via.placeholder.com/100' }} />
        <AuthorName>Por {post.first_name} {post.last_name}</AuthorName>
      </AuthorInfo>
    </Container>
  );
}
