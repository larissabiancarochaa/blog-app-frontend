import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';

const Card = styled.View<{ variant: string }>`
  background-color: transparent;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
  width: 100%;
`;

const PostImage = styled.Image`
  width: 100%;
  height: 180px;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  font-family: 'Montserrat-Bold';
  color: black;
  margin-bottom: 4px;
`;

const MetaInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

const AuthorInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

const AuthorImage = styled.Image`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  margin-right: 8px;
`;

const AuthorName = styled.Text`
  font-size: 14px;
  color: #000;
  font-family: 'Montserrat-SemiBold';
`;

const Description = styled.Text`
  font-size: 14px;
  color: #555;
  margin-top: 6px;
  font-family: 'Montserrat-Regular';
`;

const LikesContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const LikesText = styled.Text`
  margin-left: 6px;
  font-size: 14px;
  color: #e63946;
  font-family: 'Montserrat-SemiBold';
`;

const PostDate = styled.Text`
  font-size: 12px;
  color: #999;
  font-family: 'Montserrat-Italic';
`;

const AuthorRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

interface PostCardProps {
  post: {
    id: number;
    title: string;
    description?: string;
    image?: string;
    likes: number;
    created_at?: string;
    first_name?: string;
    last_name?: string;
    profile_image?: string;
  };
  onPress: () => void;
  variant?: 'featured' | 'carousel' | 'list-home' | 'list-full';
}

export const PostCard: React.FC<PostCardProps> = ({ post, onPress, variant = 'featured' }) => {
  const formattedDate = post.created_at
    ? new Date(post.created_at).toLocaleDateString('pt-BR')
    : '';

  const shortDescription =
    post.description && post.description.length > 100
      ? post.description.slice(0, 100).trim() + '...'
      : post.description;

      return (
        <TouchableOpacity onPress={onPress}>
          <Card variant={variant}>
      
            {/* Imagem */}
            {(variant === 'featured' || variant === 'carousel' || variant === 'list-full') && post.image && (
              <PostImage source={{ uri: post.image }} resizeMode="cover" />
            )}
      
            <Title numberOfLines={2}>{post.title}</Title>
      
            {/* Descrição curta para list-home e list-full */}
            {(variant === 'list-home' || variant === 'list-full') && shortDescription && (
              <Description>{shortDescription}</Description>
            )}
      
            {/* Autor, likes e data para featured e list-full */}
            {(variant === 'featured' || variant === 'list-full') && (
              <>
                {(post.first_name || post.last_name || post.created_at || post.likes !== undefined) && (
                  <AuthorRow>
                    <AuthorInfo>
                      {post.profile_image && <AuthorImage source={{ uri: post.profile_image }} />}
                      <AuthorName>{post.first_name} {post.last_name}</AuthorName>
                    </AuthorInfo>
      
                    <MetaInfo>
                      <LikesContainer>
                        <FontAwesome name="heart" size={16} color="#e63946" />
                        <LikesText>{post.likes}</LikesText>
                      </LikesContainer>
                      <PostDate>{formattedDate}</PostDate>
                    </MetaInfo>
                  </AuthorRow>
                )}
              </>
            )}
      
            {/* Likes e data para carousel */}
            {variant === 'carousel' && (
              <MetaInfo>
                <LikesContainer>
                  <FontAwesome name="heart" size={16} color="#e63946" />
                  <LikesText>{post.likes}</LikesText>
                </LikesContainer>
                <PostDate>{formattedDate}</PostDate>
              </MetaInfo>
            )}
      
          </Card>
        </TouchableOpacity>
      );      
};
