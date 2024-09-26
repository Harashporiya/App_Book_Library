import { NavigationProp, useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Alert } from 'react-native'
import { RouteType } from '../Navigation'
import axios from 'axios'
import { API_BACKEND } from '../../API_Backends/Api_backend'

const ForGotPassword = () => {
    const navigation = useNavigation<NavigationProp<RouteType>>();
    const [email, setEmail] = useState('');
    const [sendCode, setVerifyCode] = useState('');

    const handelSubmitSendCode = async () => {
        if(!email.trim()){
            Alert.alert("Error", "Fields are required")
            return 
        }
       try {
        const response = await axios.post(`${API_BACKEND}/api/sendCode`,{
            email,
        })
       Alert.alert("success", "Verification code sent successfull")
        // console.log(response.data)
       } catch (error) {
        console.log("Error", error);
        Alert.alert("error", "Failed verification code sent")
       }
    }
    const handelSubmitVerifyCode =async()=>{
        if(!email.trim() || !sendCode.trim()){
            Alert.alert("error", "All fields are required")
            return;
        }
        try {
            const response = await axios.post(`${API_BACKEND}/api/verifyCode`,{
                sendCode,
                email,
            })
            setEmail("")
            setVerifyCode("")
            console.log(response.data)
        } catch (error) {
            console.log("Error", error)
        }
    }
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>Reset Your Password</Text>
            </View>
            <View style={styles.row}>
                <TextInput 
                    placeholder='Email'
                    placeholderTextColor={"#CCCCCC"}
                    style={styles.input}
                    value={email}
                    onChangeText={(text)=>setEmail(text)}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handelSubmitSendCode}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TextInput
                    placeholder='Verification Code'
                    placeholderTextColor={"#CCCCCC"}
                    style={styles.input1}
                    value={sendCode}
                    onChangeText={(text)=>setVerifyCode(text)}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handelSubmitVerifyCode}>
                <Text style={styles.btnText}>Reset Password</Text>
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
        width: 260,
        borderRadius: 40,
        color: "white",
        marginVertical: 10,
        marginRight: 10, 
    },
    input1: {
        borderColor: "#857a93",
        borderWidth: 2,
        padding: 15,
        width: 340,
        borderRadius: 40,
        color: "white",
        marginVertical: 10,
        marginRight: 10, 
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1a0933",
        padding: 10, 
    },
    text: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10, 
    },
    row: {
        flexDirection: "row",
        alignItems: "center", 
        marginBottom: 10, 
    },
    sendButton: {
        backgroundColor: "#857a93",
        borderRadius: 40,
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    sendButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    button: {
        backgroundColor: "#857a93",
        padding: 15,
        width: 350,
        borderRadius: 20,
        marginTop: 30,
    },
    btnText: {
        color: "white",
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
    },
    footer:{
        color:"white",
        fontSize:18,
        padding:20
    }
})

export default ForGotPassword;
