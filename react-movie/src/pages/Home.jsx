import { useEffect, useState } from "react";
import "../css/Home.css";
import { EmblaCarousel } from "../components/Carousel";
import { useSearchContext } from "../contexts/SearchContext";
import HeroBanner from "../components/HeroBanner";
import { getPopularHorrorMovies, getTopRatedHorrorMovies } from "../services/api";

function Home() {
  const { searchName, movies, series, error, loading, loadPopularMovies, loadPopularSeries } = useSearchContext();
  const [popularHorror, setPopularHorror] = useState([]);
  const [topRatedHorror, setTopRatedHorror] = useState([]);

  useEffect(() => {
    const fetchHorrorMovies = async () => {
      try {
        const popular = await getPopularHorrorMovies();
        setPopularHorror(popular);

        const topRated = await getTopRatedHorrorMovies();
        setTopRatedHorror(topRated);

      } catch (e) {
        console.error("Error fetching horror movies:", e);
      }
    }

    // Only load popular content if we aren't searching
    if (!searchName) {
      loadPopularMovies();
      loadPopularSeries();
    }
    fetchHorrorMovies();
  }, [searchName]);

  const filteredMovies = Array.isArray(movies)
    ? movies.filter(m => (m.title || "").toLowerCase().includes(searchName.toLowerCase()))
    : [];

  const filteredSeries = Array.isArray(series)
    ? series.filter(s => (s.name || "").toLowerCase().includes(searchName.toLowerCase()))
    : [];

  return (
    <div className="home">
      {error && <p className="error-message">{error}</p>}

      {!loading && filteredMovies.length > 0 && (
        <HeroBanner media={filteredMovies.find(m => m.backdrop_path) || filteredMovies[0]} />
      )}

      <div className="home-content">
        {searchName ? (
          <>
            <p className="section-title">Risultati ricerca Film</p>
            <EmblaCarousel movies={filteredMovies} />
            <p className="section-title">Risultati ricerca Serie TV</p>
            <EmblaCarousel movies={filteredSeries} />
          </>
        ) : (
          loading ? (
            <p className="loading">Loading...</p>
          ) : (
            <>
              <p className="section-title">I film più visti</p>
              <EmblaCarousel movies={filteredMovies} />

              <p className="section-title">Horror Più Popolari</p>
              <EmblaCarousel movies={popularHorror} />

              <p className="section-title">Le serie più viste</p>
              <EmblaCarousel movies={filteredSeries} />
            </>
          )
        )}
      </div>
    </div>
  );
}

export default Home;