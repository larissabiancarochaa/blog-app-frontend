import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';

const Card = styled.View`
  background-color: white;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
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
  color: #333;
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
  margin-top: 6px;
`;

const AuthorImage = styled.Image`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  margin-right: 8px;
`;

const AuthorName = styled.Text`
  font-size: 14px;
  color: #333;
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

interface PostCardProps {
  post: {
    id: number;
    title: string;
    description?: string;
    image?: string; // base64
    likes: number;
    created_at?: string;
    first_name?: string;
    last_name?: string;
    profile_image?: string; // base64
  };
  onPress: () => void;
  variant?: 'featured' | 'list' | 'carousel';
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
      <Card>
        {(variant === 'featured' || variant === 'carousel') && post.image && (
          <PostImage source={{ uri: post.image }} resizeMode="cover" />
        )}

        <Title numberOfLines={2}>{post.title}</Title>

        {variant === 'featured' && (
           <>
           {(post.first_name || post.last_name) && (
             <AuthorInfo>
               {post.profile_image && (
                 <AuthorImage source={{ uri: post.profile_image }} />
               )}
               <AuthorName>{post.first_name} {post.last_name}</AuthorName>
             </AuthorInfo>
           )}
           <PostDate>{formattedDate}</PostDate>
         </>
        )}

        {variant === 'list' && shortDescription && (
          <Description>{shortDescription}</Description>
        )}

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