import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import BooklyLogo from './components/BookLogo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ImageSlider from './components/ImageSlider';
import SignupForm from './components/signup/SignupForm';
import SigninForm from './components/signin/SigninForm';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="book"
            component={BooklyLogo}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
            name="ImageSlider"
            component={ImageSlider}
            options={{ headerShown: false }}
          />
        <Stack.Screen
          name="Signup"
          component={SignupForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signin"
          component={SigninForm}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
