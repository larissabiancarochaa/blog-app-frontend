import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import ArticlesScreen from '../screens/ArticlesScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import AddPostScreen from '../screens/AddPostScreen';
import MyArticlesScreen from '../screens/MyArticlesScreen';
import EditArticlesScreen from '../screens/EditArticlesScreen'; 

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      <Stack.Screen name="Articles" component={ArticlesScreen} />
      <Stack.Screen name="AddPost" component={AddPostScreen} options={{ title: 'Novo Artigo' }} />
      <Stack.Screen name="MyArticles" component={MyArticlesScreen} />
      <Stack.Screen name="EditarArtigo" component={EditArticlesScreen} />
    </Stack.Navigator>
  );
}
