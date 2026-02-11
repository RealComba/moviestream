import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext"
import { useNavigate } from "react-router-dom";
import { getSeriesById } from "../services/api"


function MediaCard({ media }) {
    const navigate = useNavigate()
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext()

    if (!media) return null

    const favorite = isFavorite(media.id)

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeFromFavorites(media.id)
        else addToFavorites(media)
    }

    function playMedia() {
        console.log(media)
        if (media.title) navigate(`/watch/movie/${media.id}`);

        else navigate(`/watch/series/${media.id}`)
    }

    return (
        media.poster_path && (
            <div
                className="movie-card"
                tabIndex="0"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') playMedia();
                }}
            >
                <div className="movie-poster">
                    <img src={`https://image.tmdb.org/t/p/w500${media.poster_path}`} alt={media.title} />
                    <div className="movie-overlay">
                        <div className="overlay-content">
                            <h3 className="font-bold">{media.title || media.name}</h3>
                            <div className="movie-actions">
                                <button className="btn play" title="Play" tabIndex="-1" onClick={playMedia}>▶</button>
                                <button className={`btn favorite-btn ${favorite ? "active" : ""}`} tabIndex="-1" onClick={onFavoriteClick}>
                                    ♥︎
                                </button>
                                <button className="btn details" title="Details" tabIndex="-1">ℹ</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    )
}

export default MediaCard