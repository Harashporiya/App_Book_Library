import React from "react"
import { View, Text, StyleSheet } from "react-native"
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Footer=()=>{
  return(
    <View style={styles.container}>
        <Entypo name="home" size={30} color="white" />
        <AntDesign name="shoppingcart" size={30} color="white" />
        <MaterialIcons name="favorite" size={30} color="white" />
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
     backgroundColor:"#1a0933",
     padding:20,
     flexDirection:"row",
     justifyContent:"space-around"
    }
})

export default Footer;