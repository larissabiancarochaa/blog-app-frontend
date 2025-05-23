import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { View, Text } from 'react-native';

import HeaderMenu from '../components/HeaderMenu';
import ProfileMenuModal from '../components/ProfileMenuModal';
import { PostCard } from '../components/PostCard';
import { fetchPosts } from '../services/api';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const ContentContainer = styled.ScrollView`
  flex: 1;
  padding: 16px;
  background-color: #fff;
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

const EmptyMessage = styled.Text`
  font-size: 16px;
  color: #888;
  font-family: 'Montserrat-Regular';
  text-align: center;
  margin-top: 32px;
`;

const formatBase64Image = (img: string | undefined | null) => {
  if (!img) return null;
  return img.startsWith('data:image') ? img : `data:image/jpeg;base64,${img}`;
};

export default function ArticlesScreen({ navigation, route }: any) {
  const user = route.params?.user;
  const profileImage = formatBase64Image(user?.profile_image);

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
                variant="list-full"
              />
            ))
          ) : (
            <EmptyMessage>Nenhum artigo encontrado.</EmptyMessage>
          )}
        </Section>
      </ContentContainer>
    </Container>
  );
}
