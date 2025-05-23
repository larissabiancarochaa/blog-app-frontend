import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import AppLoading from 'expo-app-loading'; 
import { useFonts as useMontserrat, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import { useFonts as useIrishGrover, IrishGrover_400Regular } from '@expo-google-fonts/irish-grover';

export default function App() {
  const [montserratLoaded] = useMontserrat({ Montserrat_400Regular });
  const [irishGroverLoaded] = useIrishGrover({ IrishGrover_400Regular });

  if (!montserratLoaded || !irishGroverLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}