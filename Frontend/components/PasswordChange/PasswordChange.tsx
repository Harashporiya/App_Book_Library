import { NavigationProp, useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Alert } from 'react-native'
import { RouteType } from '../Navigation'
import axios from 'axios'
import { API_BACKEND } from '../../API_Backends/Api_backend'
import AsyncStorage from '@react-native-async-storage/async-storage'

const PasswordChange = () => {
    const navigation = useNavigation<NavigationProp<RouteType>>();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
 
    const handelSubmit=async()=>{
        const _id = await AsyncStorage.getItem("userId")
        console.log("UserId:",_id)
        try {
            const response = await axios.put(`${API_BACKEND}/user/changePassword/${_id}`,{
                password,
            })
            // console.log(response.data)
            Alert.alert("success","Password updated successfully")
        } catch (error) {
           console.log("Error",error);  
           Alert.alert("Error", "Failed password updated"); 
        }
    }
    
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>Change Password</Text>
            </View>
            <View style={styles.row}>
                <TextInput 
                    placeholder='New password'
                    placeholderTextColor={"#CCCCCC"}
                    style={styles.input}
                    value={password}
                    onChangeText={(text)=>setPassword(text)}
                />
            </View>
            <View>
                <TextInput
                    placeholder='Confirm password '
                    placeholderTextColor={"#CCCCCC"}
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={(text)=>setConfirmPassword(text)}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handelSubmit} >
                <Text style={styles.btnText}>Set new Password</Text>
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

export default PasswordChange;
