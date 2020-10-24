import React, { useState } from 'react';
import { View, ActivityIndicator, Text, StyleSheet, TextInput, Button, FlatList, TouchableHighlight } from 'react-native';
import { ScreenContainer } from 'react-native-screens';
import colors from '../config/colors'
import FilmItem from './FilmItem'
import { getFilmFromApiWithSearchedText } from '../API/TMDBApi'

export default function Search({navigation}) {
    const [Movies, setMovies] = useState([])
    const [searchedText, setSearchedText] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)

    const loadMovies = () => {
        setIsLoading(true)
        getFilmFromApiWithSearchedText(searchedText, page+1).then(data => {
            setPage(data.page)
            setTotalPage(data.total_pages)
            setMovies([...Movies,...data.results])
            setIsLoading(false)
            // {console.log(data)}
        })
    }

    const displayLoading = () => {
        if (isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    const displayDetailForMovie = (id) => {
        navigation.navigate('Détails', { id: id });
    }
    
    const renderItem = ({ item }) => (
        <FilmItem displayDetailForMovie={displayDetailForMovie} movie={item} />
    );

    return (
        <ScreenContainer style={styles.container}> 
        {/* {console.log(page, totalPage)} */}
            <TextInput 
                clearButtonMode="always"
                onKeyPress={()=> {
                    setMovies([])
                    setPage(0)
                    setTotalPage(0)
                }}
                onSubmitEditing={() => {
                    searchedText.trim().length !== 0 ? loadMovies() : ""
                }} 
                onChangeText={(text) => setSearchedText(text)} style= {styles.TextInput} value={searchedText} placeholder='Titre du film'

                />
            <TouchableHighlight
                disabled={!searchedText}
                style={{...styles.openButton, backgroundColor: searchedText.trim().length !== 0 ? colors.secondary : 'grey', marginVertical: 7}}
                onPress={() => {
                    loadMovies()
                }}
            >
                <Text style={styles.buttonTextStyle}>Rechercher</Text>
            </TouchableHighlight>
            <FlatList
                displayDetailForMovie={displayDetailForMovie}
                data={Movies}
                renderItem={renderItem}
                keyExtractor={item => Movies.indexOf(item).toString()}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    loadMovies()
                }}
            />
            {/* <Button 
                title="React Native School" 
                onPress={()=> {
                    navigation.navigate('Home', {
                        screen: "Details",
                        params: { name: 'React Native School' }
                    })
                }}
            /> */}
            {displayLoading()}
        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    },
    TextInput: {
        margin: 5,
        padding: 5,
        borderColor: '#000',
        borderWidth: 1,
        height: 50,
        borderRadius: 10
    },
    openButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        alignSelf: "center",
        marginBottom: 10,
    },
    loading_container: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 100, 
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonTextStyle: {
        color: '#FFFFFF'
    }
})
