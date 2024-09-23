import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';

const BooklyLogo = () => {
  return (<>
  <StatusBar  barStyle="light-content"/>
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoTextContainer}>
          <Text style={styles.logo}>B</Text>
          <View style={styles.circleO} />
          <View style={styles.circleO} />
          <Text style={styles.logo}>KLY</Text>
        </View>

        <Animatable.Text
          animation={{
            0: { translateY: 0 },
            0.5: { translateY: -10 },
            1: { translateY: 0 }
          }}
          iterationCount="infinite"
          duration={2000}
          style={styles.tagline}
        >
         Read Free Books
        </Animatable.Text>
        <Animatable.Text
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          style={styles.book}
        >
          📚
        </Animatable.Text>
      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a0933',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 5,
  },
  circleO: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    marginHorizontal: -5,
  },
  tagline: {
    color: '#cccccc',
    fontSize: 16,
    marginTop: 20,
  },
  heart: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: 20,
  },
  book: {
    textAlign: 'center',
    fontSize: 40,
    marginTop: 20,
  },
});

export default BooklyLogo;
