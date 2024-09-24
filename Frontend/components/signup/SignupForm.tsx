import { NavigationProp, useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, TextInput, View,Text, TouchableOpacity } from 'react-native'
import { RouteType } from '../Navigation'

const SignupForm = () => {
    const navigation = useNavigation<NavigationProp<RouteType>>()
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>Signup</Text>
            </View>
            <View>
                <TextInput placeholder='first name'
                    placeholderTextColor={"white"}
                    style={styles.input} />
            </View>
            <View>
                <TextInput placeholder='last name'
                    placeholderTextColor={"white"}
                    style={styles.input} />
            </View>
            <View>
                <TextInput placeholder='email'
                    placeholderTextColor={"white"}
                    style={styles.input} />
            </View>
            <View>
                <TextInput placeholder='password'
                    placeholderTextColor={"white"}
                    style={styles.input} />
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.btn}>sign up</Text>
            </TouchableOpacity>
            <View>
                <Text style={styles.footer}>Already have an account? <Text style={{color:"red"}} onPress={()=>navigation.navigate("Signin")}>Sign in</Text></Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        borderColor: "#857a93",
        borderWidth: 2,
        padding: 15,
        width: 350,
        borderRadius: 40,
        color: "white",
        margin:10,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1a0933",
    
    },
    text:{
        color:"white",
        fontSize:30,
        fontWeight:"bold",

    },
    btn:{
        color:"white",
        textAlign:"center",
        fontSize:20,
        fontWeight:"bold",
    },
    button:{
        backgroundColor:"#857a93",
        padding:10,
        width:350,
        borderRadius:20,
        margin:30
    },
    footer:{
        color:"white",
        fontSize:18,
    }
})

export default SignupForm
