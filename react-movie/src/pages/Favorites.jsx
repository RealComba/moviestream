import "../css/Favorites.css"
import { useMovieContext } from "../contexts/MovieContext"
import MovieCard from "../components/MediaCard"


function Favorites() {
    const {favorites} = useMovieContext();
    if (favorites.length > 0) {
        return (
        <div>
            <h2 className="favorites font-bold text-2xl">Preferiti</h2>
            <div className="movies-grid">
                {favorites.map(movie => 
                <MovieCard media={movie} key={movie.id} ></MovieCard>
                )}
            </div>
        </div>
        )
    }
    return (
        <div>
            <div className="favorites-empty">
                <h2 className="font-bold">Nessun media tra i Preferiti</h2>
                <p>Aggiungi un media tra i preferiti per iniziare</p>
            </div>
        </div>
    )
}


export default Favorites