// screens/HomeScreen.tsx
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
  background-color: #ffffff;
  padding: 30px 0 70px 0
`;

const ContentContainer = styled.ScrollView`
  flex: 1;
  padding: 20px 16px;
`;

const FeaturedPostContainer = styled.View`
  margin-bottom: 28px;
`;

const Section = styled.View`
  margin-bottom: 32px;
`;

const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  font-family: 'Montserrat-Bold';
  color: #222;
`;

const RecentPostsWrapper = styled.View`
  background-color: #f3f3f3;
  padding: 16px;
  border-radius: 16px;
  shadow-color: #000;
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  elevation: 2;
  gap: 12px;
`;

const RecentPostsImage = styled.Image`
  width: 60px;
  height: 60px;
  margin-bottom: 12px;
  align-self: center;
  border-radius: 8px;
`;

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen({ navigation, route }: any) {
  const user = route.params?.user;

  const [modalVisible, setModalVisible] = useState(false);
  const [latestPost, setLatestPost] = useState<any>(null);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [topPosts, setTopPosts] = useState<any[]>([]);
  const [carouselScrollEnabled, setCarouselScrollEnabled] = useState(true);
  const profileImage = user?.profile_image ?? null;

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
        navigateTo={(screen, params = {}) => navigation.navigate(screen, { ...params, user })}
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

        {latestPost && (
          <FeaturedPostContainer>
            <PostCard
              post={latestPost}
              onPress={() => handlePostPress(latestPost.id)}
              variant="featured"
            />
          </FeaturedPostContainer>
        )}

        <Section>
          <SectionTitle>Posts Recentes</SectionTitle>
          <RecentPostsWrapper>
            {recentPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onPress={() => handlePostPress(post.id)}
                variant="list-home"
              />
            ))}
          </RecentPostsWrapper>
        </Section>

        <Section style={{ pointerEvents: modalVisible ? 'none' : 'auto' }}>
          <SectionTitle>Mais Curtidos</SectionTitle>
          {!modalVisible && (
            <Carousel
              loop
              width={screenWidth * 1}
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
