import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import BooklyLogo from './components/BookLogo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ImageSlider from './components/ImageSlider';
import SignupForm from './components/signup/SignupForm';
import SigninForm from './components/signin/SigninForm';
import ShowBook from "./components/Book/ShowBook"
import BookId from './components/Book/BookId';
import { RootRouteType } from './components/Navigation';
const Stack = createNativeStackNavigator<RootRouteType>();

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
      {/* <Stack.Screen
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
        /> */}
        <Stack.Screen
        name='Book' component={ShowBook} options={{headerShown:false}}/>
        <Stack.Screen name='bookId' component={BookId} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
