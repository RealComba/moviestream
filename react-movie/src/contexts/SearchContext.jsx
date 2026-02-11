import { createContext, useState, useContext } from "react"
import { getPopularMovies, getPopularSeries, search } from "../services/api"

const SearchContext = createContext()

export const useSearchContext = () => useContext(SearchContext)

export const SearchProvider = ({ children }) => {
  const [searchName, setSearchName] = useState("")
  const [movies, setMovies] = useState([])
  const [series, setSeries] = useState([])
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true)
  const [isSearchingSeries, setIsSearchingSeries] = useState(false)
  const [searching, setSearching] = useState([])

  //carico film popolari
  const loadPopularMovies = async () => {
    try {
      setLoading(true)
      const popularMovies = await getPopularMovies()
      setMovies(popularMovies)
      setError(null)
    } catch (err) {
      console.log(err)
      setError("Failed to load movies...")
    } finally {
      setLoading(false)
    }
  }

  const loadPopularSeries = async () => {
    try {
      setLoading(true)
      const popularSeries = await getPopularSeries()
      setSeries(popularSeries)
      setError(null)
    } catch (err) {
      console.log(err)
      setError("Failed to load movies...")
    } finally {
      setLoading(false)
    }
  }

  //ricerca film
  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchName.trim()) {
      await loadPopularMovies()
      return
    }
    if (loading) return

    setLoading(true)
    try {
      const results = await search(searchName)
      // Separa in base a mediaType
      const movies = results.filter(r => r.mediaType === 'movie')
      const series = results.filter(r => r.mediaType === 'tv')

      setMovies(movies)
      setSeries(series)
      setError(null)
    } catch (err) {
      console.log(err)
      setError("Failed to search...")
    } finally {
      setLoading(false)
    }
  }

  const triggerSearch = async (query) => {
    setSearchName(query);
    if (!query.trim()) {
      await loadPopularMovies();
      return;
    }
    setLoading(true);
    try {
      const results = await search(query)
      const movies = results.filter(r => r.mediaType === 'movie')
      const series = results.filter(r => r.mediaType === 'tv')
      setMovies(movies)
      setSeries(series)
      setError(null)
    } catch (err) {
      console.error(err)
      setError("Search failed")
    } finally {
      setLoading(false)
    }
  }

  const value = {
    searchName,
    setSearchName,
    movies,
    series,
    error,
    loading,
    handleSearch,
    loadPopularMovies,
    isSearchingSeries,
    setIsSearchingSeries,
    loadPopularSeries,
    triggerSearch
  }
  return <SearchContext.Provider value={value}>
    {children}
  </SearchContext.Provider>
}