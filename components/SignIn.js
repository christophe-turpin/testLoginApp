import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Image, Modal, StyleSheet, TouchableHighlight, ImageBackground, Alert } from 'react-native';
import { AuthContext } from '../context'
import colors from '../config/colors';

export default function SignIn() {
    const [logModalVisible, setLogModalVisible] = useState(false);
    const [regModalVisible, setRegModalVisible] = useState(false);
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [isValidUser, setIsValidUser] = useState(true)
    const [isValidEmail, setIsValidEmail] = useState(true)
    const [isValidPassword, setIsValidPassword] = useState(true)
    const [isValidNewEmail, setIsValidNewEmail] = useState(true)
    const [isValidNewPassword, setIsValidNewPassword] = useState(true)
    const { signIn } = useContext(AuthContext)
    const { signUp } = useContext(AuthContext)

    const handleValidUser = (val) => {
        val.trim().length >= 4 || val.trim().length === 0 ? setIsValidUser(true) : setIsValidUser(false)
    }             

    const handleValidEmail = (val) => {
        val.trim().includes('@' && '.com') || val.trim().includes('@' && '.fr')|| val.trim().includes('@' && '.net') || val.trim().length === 0 ? setIsValidEmail(true) : setIsValidEmail(false)
    }   

    const handleValidPassword = (val) => {
        val.trim().length >= 5 || val.trim().length === 0 ? setIsValidPassword(true) : setIsValidPassword(false)
    }

    const handleValidNewEmail = (val) => {
        val.trim().includes('@' && '.com') || val.trim().includes('@' && '.fr')|| val.trim().includes('@' && '.net') || val.trim().length === 0 ? setIsValidNewEmail(true) : setIsValidNewEmail(false)
    }   

    const handleValidNewPassword = (val) => {
        val.trim().length >= 5 || val.trim().length === 0 ? setIsValidNewPassword(true) : setIsValidNewPassword(false)
    }

    // const handleLogin = (email, password) => {
    //     const foundUser = Users.filter(item => {
    //         return email === item.email && password === item.password
    //     })
    //     if (foundUser.length === 0) {
    //     Alert.alert('Invalid User!', 'Email or password is incorrect')
    //     return 
    //     } 
    //     signIn(foundUser)
    // }

    useEffect(()=>{
        handleValidUser(newUsername)
        handleValidEmail(userEmail)
        handleValidPassword(userPassword)
        handleValidNewEmail(newEmail)
        handleValidNewPassword(newPassword)
    }, [])

    return (
        <ImageBackground style={styles.background} source={{uri: 'https://london.frenchmorning.com/wp-content/uploads/sites/10/2018/09/cine%CC%81ma.jpg'}}> 
            <Modal animationType="slide" transparent={true} visible={logModalVisible} onRequestClose={() => {Alert.alert("Modal has been closed.")}}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.title}>Login</Text>
                        <View style={styles.modalContainer}>
                            <TextInput 
                            //onEndEditing={(e) => handleValidEmail(e.nativeEvent.text)} 
                            placeholder='Email' onChangeText={(text)=> setUserEmail(text)} value={userEmail} textContentType='emailAddress' clearButtonMode='while-editing' keyboardType='email-address' autoCompleteType='email' style={styles.modalTextInput}/>
                        </View>
                        <Text style={isValidEmail ? styles.noErrorMessage : styles.errorMessage}>Please use a valid email address.</Text>
                        <View style={styles.modalContainer}>
                            <TextInput 
                            //onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)} 
                            placeholder='Password' secureTextEntry={true}  onChangeText={(text)=> setUserPassword(text)} value={userPassword} textContentType='password' clearButtonMode='while-editing' style={styles.modalTextInput}/>
                        </View>
                        <Text style={isValidPassword ? styles.noErrorMessage : styles.errorMessage}>Password must be 5 characters long.</Text>
                        <TouchableHighlight
                            disabled={!isValidEmail || !isValidPassword || !userEmail || !userPassword}
                            style={{...styles.openButton, backgroundColor: (!isValidEmail || !isValidPassword || !userEmail || !userPassword ? 'grey' : colors.secondary ), marginBottom: 25,}}
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
                            setUserEmail(null)
                            setUserPassword(null)
                            setIsValidUser(true)
                            setIsValidEmail(true)
                            setIsValidPassword(true)
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
                            <TextInput 
                            //onEndEditing={(e) => handleValidUser(e.nativeEvent.text)} 
                            placeholder='Username' onChangeText={(text)=> setNewUsername(text)} value={newUsername} clearButtonMode='while-editing' autoCompleteType='username' style={styles.modalTextInput}/>
                        </View>
                        <Text style={isValidUser ? styles.noErrorMessage : styles.errorMessage}>Username must be 4 characters long.</Text>
                        <View style={styles.modalContainer}>
                            <TextInput 
                            //onEndEditing={(e) => handleValidNewEmail(e.nativeEvent.text)} 
                            placeholder='Email' onChangeText={(text)=> setNewEmail(text)} value={newEmail} textContentType='emailAddress' clearButtonMode='while-editing' keyboardType='email-address' autoCompleteType='email' style={styles.modalTextInput}/>
                        </View>
                            <Text style={isValidNewEmail ? styles.noErrorMessage : styles.errorMessage}>Please use a valid email address.</Text>
                        <View style={styles.modalContainer}>
                            <TextInput 
                            // onEndEditing={(e) => handleValidNewPassword(e.nativeEvent.text)} 
                            placeholder='Password' secureTextEntry={true} onChangeText={(text)=> setNewPassword(text)} value={newPassword} textContentType='password' clearButtonMode='while-editing' style={styles.modalTextInput}/>
                        </View>
                            <Text style={isValidNewPassword ? styles.noErrorMessage : styles.errorMessage}>Password must be 5 characters long.</Text>
                        <TouchableHighlight
                            disabled={!isValidNewEmail || !isValidNewPassword || !newEmail || !newPassword}
                            style={{...styles.openButton, backgroundColor: (!isValidNewEmail || !isValidNewPassword || !newEmail || !newPassword ? 'grey' : colors.primary ), marginBottom: 25,}}
                            onPress={() => {
                                signUp(newUsername, newEmail, newPassword)
                                Alert.alert('You have been successfully registered')
                                setNewEmail(null)
                                setNewUsername(null)
                                setNewPassword(null)
                            }}
                        >
                            <Text style={styles.textStyle}>Sign in</Text>
                        </TouchableHighlight>
                        <Text style={{...styles.modalText, marginBottom: -5}}>Already have an account ?</Text>
                        <TouchableHighlight
                        style={{...styles.openButton, backgroundColor: colors.secondary}}
                        onPress={() => {
                            setRegModalVisible(false)
                            setLogModalVisible(true)
                            setNewUsername(null)
                            setNewEmail(null)
                            setNewPassword(null)
                            setIsValidUser(true)
                            setIsValidNewEmail(true)
                            setIsValidNewPassword(true)
                        }}
                        >

                            <Text style={styles.textStyle}>Login</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
                    <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('../assets/logo_ct_rondnoir_blanc.png')}/>
            <Text style={styles.underLogo}>Cinéma & Co</Text>
            </View>
            <TouchableHighlight style={styles.loginButton} onPress={() => {setLogModalVisible(true)}}><Text style={styles.buttonText}>Login</Text></TouchableHighlight>
            <TouchableHighlight style={styles.registerButton} onPress={() => {setRegModalVisible(true)}}><Text style={styles.buttonText}>Sign in</Text></TouchableHighlight>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    errorMessage: {
        textAlign: "center",
        textDecorationLine: "underline",
        color: "red",
    },
    noErrorMessage: {
        display: "none",
    },
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    logo:{
        width:100,
        height: 100,
        marginBottom: 30,
    },
    underLogo: {
        fontSize: 17,
        fontStyle: "italic",
        fontWeight: "bold"
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
    loginButton: {
        backgroundColor: colors.secondary,
        padding: 10,
        width: '100%',
        alignItems: "center",
        justifyContent: 'center',
        height: 70,
    },
    registerButton: {
        backgroundColor: colors.primary,
        padding: 10,
        width: '100%',
        alignItems: "center",
        justifyContent: 'center',
        height: 70,
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
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        width: "100%",
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
    }
})