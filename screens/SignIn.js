import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { ScreenContainer } from 'react-native-screens';
import { AuthContext } from '../context'

export default function SignIn({navigation}) {
    const { signIn } = useContext(AuthContext)
    return (
        <ScreenContainer style={styles.container}>
            <Text>Sign In Screen</Text>
            <Button title="SignIn" onPress={()=> signIn()}/>
            <Button title="Create Account" onPress={()=>navigation.push('CreateAccount')}/>
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
