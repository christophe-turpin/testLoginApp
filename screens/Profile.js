import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { ScreenContainer } from 'react-native-screens';
import { AuthContext } from '../context'

export default function Profile({ navigation }) {
    const { signOut } = useContext(AuthContext)
    return (
        <ScreenContainer style={styles.container}>
            <Text>Profile Screen</Text>
            <Button title="Drawer" onPress={()=> navigation.toggleDrawer()}/>
            <Button title="signOut" onPress={()=> signOut()}/>
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
