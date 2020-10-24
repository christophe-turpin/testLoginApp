import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { ScreenContainer } from 'react-native-screens';
import { AuthContext } from '../context'

export default function CreateAccount() {
    const { signUp } = useContext(AuthContext)
    return (
        <ScreenContainer style={styles.container}>
            <Text>Create Account Screen</Text>
            <Button title="Sign Up" onPress={()=> signUp()}/>
        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
