import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Modal, TouchableOpacity } from 'react-native'; // Importei TouchableOpacity
import styled from 'styled-components/native';
import { format } from 'date-fns';

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
  background-color: #121212;
  padding: 20px;
`;

const Card = styled.View`
  background-color: #1e1e1e;
  border-radius: 12px;
  margin-bottom: 16px;
  overflow: hidden;
`;

const Image = styled.Image`
  width: 100%;
  height: 160px;
`;

const Info = styled.View`
  padding: 12px;
`;

const Title = styled.Text`
  color: white;
  font-size: 18px;
  font-family: 'Montserrat-Bold';
  margin-bottom: 8px;
`;

const Meta = styled.Text`
  color: #aaa;
  font-size: 13px;
`;

const Like = styled.Text`
  color: #10a3b9;
  font-size: 13px;
  margin-top: 6px;
`;

const Actions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

const ActionButton = styled.TouchableOpacity`
  padding: 8px;
`;

const ActionText = styled.Text`
  color: #5da9e9;
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 20px;
`;

const ModalContent = styled.View`
  background-color: #1e1e1e;
  border-radius: 12px;
  padding: 20px;
`;

const ModalTitle = styled.Text`
  color: white;
  font-size: 20px;
  font-family: 'Montserrat-Bold';
  margin-bottom: 16px;
`;

const ModalText = styled.Text`
  color: #ccc;
  margin-bottom: 16px;
`;

const ModalActions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

const CancelButton = styled.TouchableOpacity`
  padding: 10px 20px;
  background-color: #333;
  border-radius: 8px;
`;

const DeleteButton = styled.TouchableOpacity`
  padding: 10px 20px;
  background-color: #e74c3c;
  border-radius: 8px;
`;

const ButtonText = styled.Text`
  color: white;
`;

export default function MyArticlesScreen({ route, navigation }: Props) {
  const user = route.params?.user;
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch(`http://192.168.0.21:3000/api/posts/my-posts/${user.id}`)
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
      const res = await fetch(`http://192.168.0.21:3000/api/posts/delete/${selectedArticle.id}`, {
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
            {/* Tornei a imagem clicável */}
            <TouchableOpacity onPress={() => handleArticlePress(item)}>
              {item.image ? (
                <Image source={{ uri: item.image }} />
              ) : (
                <Image source={require('../assets/default-profile.png')} />
              )}
            </TouchableOpacity>

            <Info>
              {/* Tornei o título clicável */}
              <TouchableOpacity onPress={() => handleArticlePress(item)}>
                <Title>{item.title}</Title>
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