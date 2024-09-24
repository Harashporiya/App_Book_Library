import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import BooklyLogo from './components/BookLogo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ImageSlider from './components/ImageSlider';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoading ? (
          <Stack.Screen
            name='book'
            component={BooklyLogo}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name='ImageSlider'
            component={ImageSlider}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
