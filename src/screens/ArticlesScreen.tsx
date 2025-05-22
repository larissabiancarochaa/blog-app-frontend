import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { View, Text, Dimensions } from 'react-native';

import HeaderMenu from '../components/HeaderMenu';
import ProfileMenuModal from '../components/ProfileMenuModal';
import { PostCard } from '../components/PostCard';
import { fetchPosts } from '../services/api';

const Container = styled.View`
  flex: 1;
`;

const ContentContainer = styled.ScrollView`
  flex: 1;
  padding: 16px;
`;

const Section = styled.View`
  margin-bottom: 24px;
`;

const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  font-family: 'Montserrat-Bold';
  color: #333;
`;

export default function ArticlesScreen({ navigation, route }: any) {
  const user = route.params?.user;
  const profileImage = user?.profile ?? null;

  // ✅ LOG PARA DEBUG
  console.log('Usuário recebido na Articles:', user);

  const [modalVisible, setModalVisible] = useState(false);
  const [allPosts, setAllPosts] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;

    const loadPosts = async () => {
      try {
        const posts = await fetchPosts();
        if (isMounted) {
          setAllPosts(Array.isArray(posts) ? posts : []);
        }
      } catch (error) {
        if (isMounted) setAllPosts([]);
      }
    };

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  const handlePostPress = (postId: number) => {
    navigation.navigate('PostDetail', { postId });
  };

  return (
    <Container>
      <HeaderMenu
        onProfilePress={() => setModalVisible(true)}
        navigateTo={(screen, params) => navigation.navigate(screen, params)}
        profileImage={profileImage}
        user={user}
      />

      <ProfileMenuModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        navigateTo={(screen, params) => navigation.navigate(screen, params)}
        user={user}
      />

      <ContentContainer>
        <Section>
          <SectionTitle>Todos os Artigos</SectionTitle>
          {allPosts.length > 0 ? (
            allPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onPress={() => handlePostPress(post.id)}
                variant="list"
              />
            ))
          ) : (
            <Text>Nenhum artigo encontrado.</Text>
          )}
        </Section>
      </ContentContainer>
    </Container>
  );
}