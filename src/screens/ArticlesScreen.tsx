import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import HeaderMenu from '../components/HeaderMenu';
import ProfileMenuModal from '../components/ProfileMenuModal';
import { useNavigation } from '@react-navigation/native';

type Post = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

export default function ArticlesScreen() {
  const navigation = useNavigation<any>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null); // caso deseje puxar futuramente

  const navigateTo = (screen: string, params?: any) => {
    navigation.navigate(screen, params);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://192.168.0.21:3000/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  function handlePostPress(post: Post) {
    navigateTo('PostDetail', { post });
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <HeaderMenu
        onProfilePress={() => setMenuVisible(true)}
        navigateTo={navigateTo}
        profileImage={profileImage}
      />

      {/* Modal do menu de perfil */}
      <ProfileMenuModal
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        navigateTo={navigateTo}
      />

      {/* Conteúdo */}
      <Text style={styles.title}>Todos os Artigos</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.postCard} onPress={() => handlePostPress(item)}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.postDate}>
                {new Date(item.created_at).toLocaleDateString()}
              </Text>
              <Text numberOfLines={2} style={styles.postExcerpt}>
                {item.content}
              </Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 32 }}>
              Nenhum artigo encontrado.
            </Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  postCard: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  postDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 6,
  },
  postExcerpt: {
    fontSize: 15,
    color: '#333',
  },
});
