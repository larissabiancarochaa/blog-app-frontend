import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import Carousel from 'react-native-reanimated-carousel';

import HeaderMenu from '../components/HeaderMenu';
import ProfileMenuModal from '../components/ProfileMenuModal';
import { PostCard } from '../components/PostCard';
import { fetchPosts, fetchTopPosts } from '../services/api';

const Container = styled.View`
  flex: 1;
`;

const ContentContainer = styled.ScrollView`
  flex: 1;
  padding: 16px;
`;

const FeaturedPostContainer = styled.View`
  margin-bottom: 24px;
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

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen({ navigation }: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const [latestPost, setLatestPost] = useState<any>(null);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [topPosts, setTopPosts] = useState<any[]>([]);
  const [carouselScrollEnabled, setCarouselScrollEnabled] = useState(true);
  const profileImage = null;

  useEffect(() => {
    let isMounted = true;

    const loadPosts = async () => {
      try {
        const [posts, top] = await Promise.all([fetchPosts(), fetchTopPosts()]);
        if (!isMounted) return;

        if (Array.isArray(posts) && posts.length > 0) {
          setLatestPost(posts[0]);
          setRecentPosts(posts.slice(1, 6));
        } else {
          setLatestPost(null);
          setRecentPosts([]);
        }

        setTopPosts(Array.isArray(top) ? top : []);
      } catch {
        if (isMounted) {
          setLatestPost(null);
          setRecentPosts([]);
          setTopPosts([]);
        }
      }
    };

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  // Desabilita scroll do carousel enquanto modal aberto
  useEffect(() => {
    setCarouselScrollEnabled(!modalVisible);
  }, [modalVisible]);

  const handlePostPress = (postId: number) => {
    navigation.navigate('PostDetail', { postId });
  };

  const renderTopPost = ({ item }: { item: any }) => (
    <PostCard post={item} onPress={() => handlePostPress(item.id)} variant="carousel" />
  );

  return (
    <Container>
      <HeaderMenu
        onProfilePress={() => setModalVisible(true)}
        navigateTo={(screen) => navigation.navigate(screen)}
        profileImage={profileImage}
      />

      <ProfileMenuModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        navigateTo={(screen) => navigation.navigate(screen)}
      />

      <ContentContainer>
        {/* Destaque */}
        {latestPost && (
          <FeaturedPostContainer>
            <PostCard
              post={latestPost}
              onPress={() => handlePostPress(latestPost.id)}
              variant="featured"
            />
          </FeaturedPostContainer>
        )}

        {/* Últimas postagens */}
        <Section>
          <SectionTitle>Últimas Postagens</SectionTitle>
          {recentPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onPress={() => handlePostPress(post.id)}
              variant="list"
            />
          ))}
        </Section>

        {/* Carousel de mais curtidos */}
        <Section style={{ pointerEvents: modalVisible ? 'none' : 'auto' }}>
          <SectionTitle>Mais Curtidos</SectionTitle>
          { !modalVisible && (
            <Carousel
              loop
              width={screenWidth * 0.75}
              height={250}
              autoPlay={false}
              data={topPosts}
              scrollAnimationDuration={1000}
              renderItem={renderTopPost}
              mode="parallax"
              style={{ alignSelf: 'center' }}
            />
          )}
        </Section>
      </ContentContainer>
    </Container>
  );
}
