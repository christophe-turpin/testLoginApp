import React, { useContext } from 'react';
import { AsyncStorage, Alert, Text, StyleSheet, Button } from 'react-native';
import { ScreenContainer } from 'react-native-screens';

export default function Profile({ navigation }) {
    const signOut = async() => {
        try {
            await AsyncStorage.removeItem('user');
            Alert.alert('Logout Success!');
            navigation.push( 'SignIn' );
          } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
          }
    }

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
