const API_KEY = "6053a275d4f2511beb8daefa9f6a15e6"
const BASE_URL = "https://api.themoviedb.org/3"

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=it-IT`);
    const data = await response.json()
    return data.results
};

export const getPopularSeries = async () => {
    const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=it-IT`)
    const data = await response.json()
    return data.results
}

export const getNowPlayingMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=it-IT`)
    const data = await response.json()
    return data.results
}

export const getPopularHorrorMovies = async () => {
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27&sort_by=popularity.desc&language=it-IT`)
    const data = await response.json()
    return data.results
}

export const getTopRatedHorrorMovies = async () => {
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27&sort_by=vote_average.desc&vote_count.gte=100&language=it-IT`)
    const data = await response.json()
    return data.results
}



export const search = async (query) => {
    const response1 = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data1 = await response1.json()
    const response2 = await fetch(`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data2 = await response2.json()

    // Aggiungi mediaType a ogni risultato
    const moviesWithType = data1.results.map(m => ({ ...m, mediaType: 'movie' }))
    const seriesWithType = data2.results.map(s => ({ ...s, mediaType: 'tv' }))

    return [...moviesWithType, ...seriesWithType]
}


export async function getMovieById(id) {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=it-IT`);
    return res.json();
}

export async function getSeriesById(id) {
    const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=it-IT`);
    return res.json();
}

// ...existing code...

export async function getImages(id, mediaType = 'movie') {
    const endpoint = mediaType === 'movie' ? 'movie' : 'tv'
    const res = await fetch(
        `${BASE_URL}/${endpoint}/${id}/images?api_key=${API_KEY}`
    )
    return res.json()
}

export async function getYoutube(id, mediaType = 'movie') {
    const endpoint = mediaType === 'movie' ? 'movie' : 'tv'
    const res = await fetch(`${BASE_URL}/${endpoint}/${id}/videos?api_key=${API_KEY}`)
    return res.json()
}