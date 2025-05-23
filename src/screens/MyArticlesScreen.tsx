import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Modal, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { format } from 'date-fns';
import { API_URL } from '../services/config';

interface Article {
  id: number;
  title: string;
  image: string | null;
  likes: number;
  created_at: string;
  updated_at: string | null;
}

interface Props {
  route: any;
  navigation: any;
}

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 20px;
`;

const Card = styled.View`
  flex-direction: row;
  background-color: #f9f9f9;
  border-radius: 12px;
  margin-bottom: 16px;
  overflow: hidden;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

const ImageWrapper = styled.View`
  width: 120px;
  height: 120px;
  overflow: hidden;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

const Info = styled.View`
  flex: 1;
  padding: 12px 16px;
  justify-content: center;
`;

const Title = styled.Text`
  color: #222222;
  font-size: 18px;
  font-family: 'Montserrat-Bold';
  margin-bottom: 6px;
`;

const Meta = styled.Text`
  color: #555555;
  font-size: 13px;
  margin-bottom: 4px;
`;

const Like = styled.Text`
  color: #888888;
  font-size: 13px;
  margin-top: 6px;
`;

const Actions = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 10px;
`;

const ActionButton = styled.TouchableOpacity`
  padding: 8px 12px;
  margin-right: 12px;
`;

const ActionText = styled.Text`
  color: #2a7ae2;
  font-weight: 600;
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
`;

const ModalContent = styled.View`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
`;

const ModalTitle = styled.Text`
  color: #222222;
  font-size: 20px;
  font-family: 'Montserrat-Bold';
  margin-bottom: 16px;
`;

const ModalText = styled.Text`
  color: #444444;
  margin-bottom: 16px;
  font-size: 16px;
`;

const ModalActions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

const CancelButton = styled.TouchableOpacity`
  padding: 10px 20px;
  background-color: #ccc;
  border-radius: 8px;
`;

const DeleteButton = styled.TouchableOpacity`
  padding: 10px 20px;
  background-color: #e74c3c;
  border-radius: 8px;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
`;

export default function MyArticlesScreen({ route, navigation }: Props) {
  const user = route.params?.user;
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/posts/my-posts/${user.id}`)
      .then(res => {
        if (!res.ok) throw new Error('Erro na resposta da API');
        return res.json();
      })
      .then(data => setArticles(data))
      .catch(error => {
        console.error('Erro ao buscar artigos:', error);
        Alert.alert('Erro', 'Não foi possível carregar os artigos.');
      });
  }, [user.id]);

  function confirmDelete(article: Article) {
    setSelectedArticle(article);
    setModalVisible(true);
  }

  async function handleDelete() {
    if (!selectedArticle) return;

    try {
      const res = await fetch(`${API_URL}/api/posts/delete/${selectedArticle.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Falha na exclusão');

      setArticles(articles.filter(a => a.id !== selectedArticle.id));
      setModalVisible(false);
      setSelectedArticle(null);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir o artigo.');
    }
  }

  function handleArticlePress(article: Article) {
    navigation.navigate('PostDetail', { postId: article.id });
  }

  return (
    <Container>
      <FlatList
        data={articles}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Card>
            <TouchableOpacity onPress={() => handleArticlePress(item)}>
              <ImageWrapper>
                {item.image ? (
                  <Image source={{ uri: item.image }} resizeMode="cover" />
                ) : (
                  <Image source={require('../assets/default-profile.png')} resizeMode="cover" />
                )}
              </ImageWrapper>
            </TouchableOpacity>

            <Info>
              <TouchableOpacity onPress={() => handleArticlePress(item)}>
                <Title numberOfLines={2}>{item.title}</Title>
              </TouchableOpacity>

              <Meta>Criado em: {format(new Date(item.created_at), 'dd/MM/yyyy')}</Meta>
              {item.updated_at && (
                <Meta>Atualizado em: {format(new Date(item.updated_at), 'dd/MM/yyyy')}</Meta>
              )}
              <Like>❤️ {item.likes || 0} curtidas</Like>

              <Actions>
                <ActionButton
                  onPress={() => navigation.navigate('EditarArtigo', { article: item })}
                >
                  <ActionText>Editar</ActionText>
                </ActionButton>
                <ActionButton onPress={() => confirmDelete(item)}>
                  <ActionText>Excluir</ActionText>
                </ActionButton>
              </Actions>
            </Info>
          </Card>
        )}
      />

      <Modal visible={modalVisible} transparent animationType="fade">
        <ModalContainer>
          <ModalContent>
            <ModalTitle>Excluir artigo?</ModalTitle>
            {selectedArticle && (
              <>
                <ModalText>Título: {selectedArticle.title}</ModalText>
                <ModalText>
                  Criado em: {format(new Date(selectedArticle.created_at), 'dd/MM/yyyy')}
                </ModalText>
                {selectedArticle.updated_at && (
                  <ModalText>
                    Última alteração: {format(new Date(selectedArticle.updated_at), 'dd/MM/yyyy')}
                  </ModalText>
                )}
                <ModalText>
                  Tem certeza de que deseja excluir este artigo? Esta ação não poderá ser desfeita.
                </ModalText>
              </>
            )}
            <ModalActions>
              <CancelButton onPress={() => setModalVisible(false)}>
                <ButtonText>Cancelar</ButtonText>
              </CancelButton>
              <DeleteButton onPress={handleDelete}>
                <ButtonText>Excluir</ButtonText>
              </DeleteButton>
            </ModalActions>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </Container>
  );
}
