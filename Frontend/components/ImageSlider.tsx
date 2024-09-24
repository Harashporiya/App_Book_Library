import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { RouteType } from './Navigation';

const { width } = Dimensions.get('window');

const ImageSlider = () => {
  const navigation = useNavigation<NavigationProp<RouteType>>();
  const images = [
    {
      image: "https://images.rawpixel.com/dark_image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAyL3YxMTItdGFuZy0zMS1ib29rc3RvcmUtam9iMTczNy5wbmc.png",
      title: "Welcome to Bookly, Let's shop!",
    },
    {
      image: "https://img.freepik.com/free-vector/hand-drawn-flat-design-book-club-illustration_23-2149330600.jpg",
      title: "We help people connect with stores around the world",
    },
    {
      image: "https://media.istockphoto.com/id/1397336758/vector/business-concept-illustration-on-the-subject-of-teamwork.jpg?s=612x612&w=0&k=20&c=QmCPzcFzBHt_itlKlCI8I4fWA4_kLw-835DvW3crLTc=",
      title: "We show the easy way to shop. Just stay at home with us",
    },
  ];

  return (
    <View style={styles.parentContainer}>
      <View style={styles.container}>
        <Swiper
          style={styles.wrapper}
          showsButtons={false}
          autoplay
          autoplayTimeout={3}
          paginationStyle={styles.pagination}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
        >
          {images.map((item, index) => (
            <View key={index} style={styles.slide}>
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
              </View>
            </View>
          ))}
        </Swiper>
      </View>
      <Text style={styles.button} onPress={()=>navigation.navigate("Signup")}>Continue</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: "#1a0933",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: 300,
    width: width,
  },
  wrapper: {},
  slide: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: "bold",
    padding: 10,
  },
  imageContainer: {
    width: width - 40, 
    height: 230,
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  pagination: {
    bottom: 10,
  },
  dot: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
  },
  button:{
  color:"white",
  fontSize:20,
  marginTop:30,
  backgroundColor:"#313849",
  padding:10,
  width:300,
  textAlign:"center",
  borderRadius:40,
  }
});

export default ImageSlider;