import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, ImageBackground, ActivityIndicator, ScrollView } from 'react-native';
import { ScreenContainer } from 'react-native-screens';
import { getMovieDetailFromApi } from '../API/TMDBApi'
import { getImageFromApi } from '../API/TMDBApi'
import { getBackgroundImageFromApi } from '../API/TMDBApi'

export default function Details({route}) {

    const [movie, setMovie] = useState(undefined)
    const [isLoading, setIsLoading]= useState(true)

    const displayLoading = () => {
        if (isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    useEffect(() => {
        getMovieDetailFromApi(route.params.id).then(data => {
            setMovie(data)
            setIsLoading(false)
        })
    }, [])

    const displayMovie = () => {
        if (movie != undefined) {
            // console.log(getImageFromApi(movie.poster_path))
            return (
                <ImageBackground style={styles.background} source={{uri: getBackgroundImageFromApi(movie.backdrop_path)}}>
                    <ScrollView style={styles.ScrollView}>
                        <View style={styles.titleView}>
                            <Text style={styles.title_text}>{movie.title}</Text>
                        </View>
                        <View style={styles.headerView}>
                            <View style={styles.imageView}>
                                <Image style={styles.image} source={{uri: getImageFromApi(movie.poster_path)}} />
                            </View>   
                            <View style={styles.textView}>
                                <Text><Text style={{fontWeight:'bold'}}>Titre Original ({movie.original_language}) :</Text> {movie.original_title}</Text>
                                <Text><Text style={{fontWeight:'bold'}}>Sortie : </Text>{movie.release_date}</Text>
                                <Text><Text style={{fontWeight:'bold'}}>Genres : </Text>{movie.genres.map(item => `${item.name}, ` )}</Text>
                                <Text><Text style={{fontWeight:'bold'}}>Budget : </Text>{movie.budget} $</Text>
                                <Text><Text style={{fontWeight:'bold'}}>Revenus : </Text>{movie.revenue} $</Text>
                                <Text><Text style={{fontWeight:'bold'}}>Popularité : </Text>{movie.popularity}</Text>                                                              
                                <Text><Text style={{fontWeight:'bold'}}>Note moyenne : </Text>{movie.vote_average}</Text>
                                <Text><Text style={{fontWeight:'bold'}}>Nombre de vote : </Text>{movie.vote_count}</Text>
                            </View>
                        </View>  
                        <View style={styles.overView}>
                            <Text style={styles.title_text}>Synopsis</Text>
                            <Text style={styles.overview}>{movie.overview}</Text>
                        </View>                   
                    </ScrollView>
                </ImageBackground>
            )
        }
    }

    return (
        <ScreenContainer style={styles.container}>
            {displayMovie()}
            {displayLoading()}
        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading_container: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0, 
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
    }, 
    ScrollView: {
        flex: 1,
        backgroundColor: 'whitesmoke',
        opacity: 0.6,
        width: '95%',
        height: '80%',
        borderRadius: 20,        
    },
    background: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: "center",
    }, 
    imageView: {
        flex: 1,
        backgroundColor: "grey",
    },
    image: {
        flex: 1,
    },
    headerView: {
        flex: 1,
        width:'100%',
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    textView: {
        flex: 2,
        padding: 10,
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "space-evenly"
    },
    titleView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        padding: 7,
    },
    title_text: {
        flex: 1,
        fontSize: 22,
        fontWeight: "bold", 
        flexWrap: "wrap",
        textAlign: "center",
    },
    vote: {
        flex: 1,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: 'right',
    },
    overView: {
        flex: 5,
        marginTop: 25,
        marginHorizontal: 30,
    },
    overview: {
        fontStyle: "italic",
        fontSize: 16,
        marginTop: 20,
    },
    releaseView: {
        flex: 1, 
    },
    release: {
        textAlign: 'right',
    }
})
