import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { ScreenContainer } from 'react-native-screens';

export default function Details({route}) {
    return (
        <ScreenContainer style={styles.container}>
            <Text>Details Screen</Text>
            {route.params.name && <Text>{route.params.name}</Text>}
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
