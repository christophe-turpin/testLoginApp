import Axios from 'axios';
import React, { useContext, useState } from 'react';
import { AsyncStorage, ImageBackground, StyleSheet, View, Image, Text, Alert, Modal, TouchableHighlight, TextInput } from 'react-native';
import colors from '../config/colors';

export default function SignIn() {
    const [logModalVisible, setLogModalVisible] = useState(false);
    const [regModalVisible, setRegModalVisible] = useState(false);
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const saveItem = async(item, selectedValue) => {
        try {
            const jsonValue = JSON.stringify(selectedValue)
            await AsyncStorage.setItem(item, jsonValue);
        } catch (error) {
            console.error('AsyncStorage error: ' + error.message);
        }
      }

    const signUp = (pseudo, email, pass) => { 
        if (!pseudo || !email || !pass) return;
        Axios.post('http://192.168.0.23:3001/api/auth/signup', {
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
            pseudo: pseudo,
            email: email,
            password: pass,
        })
        })
        .then((response) => response.json())
        .then((responseData) => {
        saveItem('user', responseData)
        Alert.alert( 'Signup Success!', 'Click the button to get a Chuck Norris quote!')
        }
        ).catch((err) => console.error(err))
        .done();
    }

    const signIn = {}

    return (
        
            <ImageBackground style={styles.background}source={require('../assets/background.jpg')}> 
            <Modal animationType="slide" transparent={true} visible={logModalVisible} onRequestClose={() => {Alert.alert("Modal has been closed.")}}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.title}>Login</Text>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalText}>Email</Text>
                            <TextInput onChangeText={(text)=> setUserEmail(text)} value={userEmail} textContentType='emailAddress' clearButtonMode='while-editing' keyboardType='email-address' autoCompleteType='email' style={styles.modalTextInput}/>
                        </View>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalText}>Password</Text>
                            <TextInput secureTextEntry={true}  onChangeText={(text)=> setUserPassword(text)} value={userPassword} textContentType='password' clearButtonMode='while-editing' style={styles.modalTextInput}/>
                        </View>
                        <TouchableHighlight
                            style={{...styles.openButton, backgroundColor: colors.secondary, marginBottom: 25,}}
                            onPress={() => {
                                signIn(userEmail, userPassword)
                            }}
                        >
                            <Text style={styles.textStyle}>Login</Text>
                        </TouchableHighlight>
                        <Text style={{...styles.modalText, marginBottom: -5}}>You don't have an account ?</Text>
                        <TouchableHighlight
                        style={{...styles.openButton, backgroundColor: colors.primary}}
                        onPress={() => {
                            setLogModalVisible(false)
                            setRegModalVisible(true)
                        }}
                        >
                            <Text style={styles.textStyle}>Sign in</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={regModalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.title}>Sign in</Text>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalText}>Pseudo</Text>
                            <TextInput onChangeText={(text)=> setNewUsername(text)} value={newUsername} clearButtonMode='while-editing' autoCompleteType='username' style={styles.modalTextInput}/>
                        </View>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalText}>Mail</Text>
                            <TextInput onChangeText={(text)=> setNewEmail(text)} value={newEmail} textContentType='emailAddress' clearButtonMode='while-editing' keyboardType='email-address' autoCompleteType='email' style={styles.modalTextInput}/>
                        </View>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalText}>Password</Text>
                            <TextInput onChangeText={(text)=> setNewPassword(text)} value={newPassword} textContentType='password' clearButtonMode='while-editing' style={styles.modalTextInput}/>
                        </View>
                        <TouchableHighlight
                            style={{...styles.openButton, backgroundColor: colors.primary, marginBottom: 25,}}
                            onPress={() => {signUp(newUsername, newEmail, newPassword)}}
                        >
                            <Text style={styles.textStyle}>Sign in</Text>
                        </TouchableHighlight>
                        <Text style={{...styles.modalText, marginBottom: -5}}>Already have an account ?</Text>
                        <TouchableHighlight
                        style={{...styles.openButton, backgroundColor: colors.secondary}}
                        onPress={() => {
                            setRegModalVisible(false)
                            setLogModalVisible(true)
                        }}
                        >
                            <Text style={styles.textStyle}>Login</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
                    <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('../assets/logo_ct_rondnoir_blanc.png')}/>
            <Text>Sell What You Don't Need</Text>
            </View>
            <TouchableHighlight style={styles.loginButton} onPress={() => {setLogModalVisible(true)}}><Text>Login</Text></TouchableHighlight>
            <TouchableHighlight style={styles.registerButton} onPress={() => {setRegModalVisible(true)}}><Text>Sign in</Text></TouchableHighlight>
        </ImageBackground>
        
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    loginButton: {
        width: "100%",
        height: 70,
        backgroundColor: colors.secondary,
        justifyContent: "center",
        alignItems: "center"
    },
    registerButton: {
        width: "100%",
        height: 70,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center"
    },
    logo:{
        width:100,
        height: 100,
    },
    logoContainer: {
        position: "absolute",
        top: 70,
        alignItems: "center"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: -20,
    },
    modalContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        width: "30%",
    },
    modalTextInput: {
        marginBottom: 15,
        textAlign: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        width: "70%",
    },
})
