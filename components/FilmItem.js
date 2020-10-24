import React, { useState } from 'react'
import { View, Alert, Modal, TouchableHighlight, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import colors from '../config/colors'
import { getImageFromApi } from '../API/TMDBApi'
import { ScreenContainer } from 'react-native-screens'

export default function FilmItem({movie, displayDetailForMovie}) {

    return (
        <ScreenContainer>
            <TouchableOpacity onPress={()=>displayDetailForMovie(movie.id)} style={styles.container}>           
                <View style={styles.imageView}>
                    <Image style={styles.image} source={{uri: getImageFromApi(movie.poster_path)}} />
                </View>
                <View style={styles.textView}>
                <View style={styles.titleView}>
                    <Text style={styles.title_text}>{movie.title}</Text>
                    <Text style={styles.vote}>{movie.vote_average}</Text>
                </View>
                <View style={styles.overView}>
                    <Text numberOfLines={6} style={styles.overview}>{movie.overview}</Text>
                </View>
                <View style={styles.releaseView}>
                    <Text style={styles.release}>{movie.release_date}</Text>
                </View>
                </View>
            </TouchableOpacity>
        </ScreenContainer>
    )
}


const styles = StyleSheet.create({
    container: {
        height: 190,
        borderWidth: 1,
        borderColor: colors.secondary,
        borderRadius: 10,
        marginVertical: 2,
        flex: 1,
        flexDirection: "row",
        paddingHorizontal: 5,
    }, 
    imageView: {
        flex: 1,
        backgroundColor: "grey",
    },
    image: {
        flex: 1
    },
    textView: {
        flex: 2,
        flexDirection: "column",
        alignItems: "stretch"
    },
    titleView: {
        flex: 1,
        flexDirection: "row",
        padding: 7,
    },
    title_text: {
        flex: 2,
        fontSize: 18,
        fontWeight: "bold", 
        flexWrap: "wrap",
    },
    vote: {
        flex: 1,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: 'right',
    },
    overView: {
        flex: 5,
        marginTop: 5,
        marginHorizontal: 7,
    },
    overview: {
        color: 'grey',
        fontStyle: "italic",
    },
    releaseView: {
        flex: 1, 
    },
    release: {
        textAlign: 'right',
    }
})