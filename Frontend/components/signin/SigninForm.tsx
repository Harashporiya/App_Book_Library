import { NavigationProp, useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, TextInput, View,Text, TouchableOpacity, Alert } from 'react-native'
import { RouteType } from '../Navigation'
import axios from 'axios'
import { API_BACKEND } from '../../API_Backends/Api_backend'

const SigninForm = () =>{
    const navigation = useNavigation<NavigationProp<RouteType>>();
    const [email, setEmail]=useState<string>("")
    const [password, setPassword] = useState<string>("")
    const handelSubmit=async()=>{
        if(!email.trim() || !password.trim()){
            Alert.alert("Error", "All fields are required!")
            return;
        }
        try {
            const response = await axios.post(`${API_BACKEND}/user/signin`,{
                email,
                password,
            })
            Alert.alert("success","Signin Successfull")
            setEmail('')
            setPassword('')
        } catch (error) {
            Alert.alert("Error", "Failed signin")
        }
    }
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>Sign In</Text>
            </View>
            <View>
                <TextInput placeholder='email'
                    placeholderTextColor={"white"}
                    style={styles.input}
                    value={email}
                    onChangeText={text=>setEmail(text)} />
            </View>
            <View>
                <TextInput placeholder='password'
                    placeholderTextColor={"white"}
                    style={styles.input} 
                    value={password}
                    onChangeText={text=>setPassword(text)}/>
            </View>
            <TouchableOpacity style={styles.button} onPress={handelSubmit}>
                <Text style={styles.btn}>sign in</Text>
            </TouchableOpacity>
            <View>
                <Text style={styles.footer}>Don't have an account? <Text style={{color:"red"}} onPress={()=>navigation.navigate("Signup")}>Sign up</Text></Text>
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

export default SigninForm
