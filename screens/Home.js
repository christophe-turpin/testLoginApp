import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { ScreenContainer } from 'react-native-screens';

export default function Home({navigation}) {
    return (
        <ScreenContainer style={styles.container}>
            <Text>Home Screen</Text>
            <Button title="React Native by Example" onPress={()=>navigation.push('Details', { name: 'React Native by Example'})}/>
            <Button title="React Native School" onPress={()=>navigation.push('Details', { name: 'React Native School'})}/>
            <Button title="Drawer" onPress={()=>navigation.toggleDrawer()}/>
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
