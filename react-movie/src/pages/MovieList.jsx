import { useEffect, useState } from "react"
import { EmblaCarousel } from "../components/Carousel"

function MovieList() {
    const [horrorMovies, setHorrorMovies] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchHorrorMovies = async () => {
            try {
                setLoading(true)
                const movies = await getHorrorMovies()
                setHorrorMovies(movies)
            } catch (error) {
                console.error("Errore nel caricamento dei film horror:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchHorrorMovies()
    }, [])

    if (loading) {
        return <div className="text-center py-10">Caricamento...</div>
    }

    return (
        <div className="px-10 py-6">
            <h2 className="font-bold text-2xl pb-4 text-neutral-200">Film Horror</h2>
            <EmblaCarousel movies={horrorMovies} />
        </div>
    )
}

export default MovieList