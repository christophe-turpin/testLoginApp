import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { ScreenContainer } from 'react-native-screens';

export default function Search2() {
    return (
        <ScreenContainer style={styles.container}>
            <Text>Search2 Screen</Text>
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
