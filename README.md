# 📘 Blog App - Frontend

Este é o frontend do Blog App, desenvolvido em React Native utilizando Expo. O projeto apresenta telas para login, registro, exibição, criação, edição e listagem de artigos, além da gestão de perfil do usuário.

---

## 🚀 Estrutura do Projeto

- `App.tsx` — arquivo principal do app
- `src/assets` — imagens e ícones, incluindo o perfil padrão
- `src/components` — componentes reutilizáveis como botões, cards de post, formulários e menu de perfil
- `src/hooks` — hooks personalizados
- `src/navigation` — definição das rotas e navegação do app
- `src/screens` — telas principais do aplicativo (Home, Login, Registro, Artigos, Perfil, etc)
- `src/services` — configuração da API e serviços para comunicação com o backend
- `src/styles` — definições de cores e estilos globais
- `src/types` — tipos TypeScript usados no projeto
- `src/utils` — funções utilitárias diversas

---

## 📦 Como Rodar o Projeto

1. Certifique-se de ter o Node.js instalado e o Expo CLI globalmente:
   
   ```bash
   npm install -g expo-cli
   ```

2. Instale as dependências do projeto:

   ```bash
   npm install
   ```

3. Inicie o servidor do Expo:

   ```bash
   npm start
   ```

4. Você pode rodar o app em um emulador Android/iOS ou em um dispositivo físico via Expo Go, escaneando o QR code que aparecerá no terminal ou na página web do Expo.

---

## 🔗 Configuração da API

O frontend se conecta ao backend pela API que está disponível em:

`http://192.168.0.21:3000`

Certifique-se que o backend está rodando e acessível na mesma rede local.

---

## 📄 Telas Principais

- Login e Registro de usuários
- Home com listagem dos posts em blocos, destaque e carrossel dos mais curtidos
- Artigos: listagem completa dos posts ordenados por data
- Visualização detalhada de cada post
- Adicionar, editar e excluir artigos (área do usuário logado)
- Perfil: visualização e edição dos dados do usuário
- Recuperação e redefinição de senha

---

## 🛠️ Tecnologias Utilizadas

- React Native com Expo
- TypeScript
- Styled Components para estilização
- Axios para chamadas à API REST
- React Navigation para navegação entre telas

---

## 📫 Contato

b35.larissa@gmail.com  
Larissa Rocha

---

Qualquer dúvida ou sugestão, fique à vontade para me contatar!
