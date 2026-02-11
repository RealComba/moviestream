import Home from "./pages/Home";
import "./css/App.css";
import { Routes, Route, useLocation } from "react-router-dom"
import Favorites from "./pages/Favorites";
import NavBar from "./components/NavBar";
import { MovieProvider } from "./contexts/MovieContext"
import { SearchProvider } from "./contexts/SearchContext";
import Series from "./pages/Series"
import MediaStreaming from "./pages/MediaStreaming";
import StreamingPage from "./pages/StreamingPage"
import MovieList from "./pages/MovieList";

function App() {
  const location = useLocation();
  const isStreamingPage = location.pathname.includes('/stream'); // This identifies the actual player page
  const isWatchPage = location.pathname.includes('/watch'); // This includes detail page

  // User asked: "quando faccio riproduci vorrei che non si vedesse piu la navbar"
  // "Riproduci" on MediaStreaming navigates to `/watch/:type/:id/stream` (StreamingPage.jsx)
  // So we should hide NavBar on `StreamingPage` route.

  const hideNavBar = isStreamingPage;

  // debug: will log after fixes
  console.log({ Home, Favorites, NavBar });

  return (
    <>
      <div className="main-content">
        <SearchProvider>
          <MovieProvider>
            {!hideNavBar && <NavBar />}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/series" element={<Series />}></Route>
              <Route path="/watch/:mediaType/:id" element={<MediaStreaming />} />
              <Route path="/watch/:mediaType/:id/stream" element={<StreamingPage />}></Route>
              <Route path="/film" element={<MovieList />}></Route>
            </Routes>
          </MovieProvider>
        </SearchProvider>
      </div>
    </>
  )
}

export default App
