import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { booktypeStore, RouteType } from "../Navigation";

const Footer = () => {
  const navigation = useNavigation<NavigationProp<RouteType>>();

  return (
    <View style={styles.container}>
      <Entypo name="home" size={30} color="white" />
      <AntDesign 
        name="shoppingcart" 
        onPress={() => navigation.navigate("BookStore", { bookId: "bookId" })} 
        size={30} 
        color="white" 
      />
      <MaterialIcons name="favorite" size={30} color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a0933",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-around"
  }
});

export default Footer;
