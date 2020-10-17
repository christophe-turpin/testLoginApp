import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { ScreenContainer } from 'react-native-screens';

export default function Search({navigation}) {
    return (
        <ScreenContainer style={styles.container}>
            <Text>Search Screen</Text>
            <Button title="Search2" onPress={()=>navigation.push('Search2')}/>
            <Button 
                title="React Native School" 
                onPress={()=> {
                    navigation.navigate('Home', {
                        screen: "Details",
                        params: { name: 'React Native School' }
                    })
                }}
            />
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
