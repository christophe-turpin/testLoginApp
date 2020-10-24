import Axios from "axios";

const API_TOKEN = "da05f2d236bb6763b71435d3c4444dd9";

export function getFilmFromApiWithSearchedText(text, page) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_TOKEN}&lang=fr&query=${text}&page=${page}`
    // console.log(url)
    return Axios.get(url)
                .then((response) => response.data)
                .catch((err) => console.log(err))
}

export function getImageFromApi(name) {
    return `https://image.tmdb.org/t/p/w300${name}`
}


export function getBackgroundImageFromApi(name) {
    return `https://image.tmdb.org/t/p/original${name}`
}

export function getMovieDetailFromApi(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_TOKEN}&lang=fr`
    // console.log(url)
    return Axios.get(url)
                .then((response) => response.data)
                .catch((err) => console.log(err))
}