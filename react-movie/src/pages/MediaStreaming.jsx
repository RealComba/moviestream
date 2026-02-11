import "../css/MediaStreaming.css";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieById, getSeriesById, getImages, getYoutube, getNowPlayingMovies } from "../services/api";
import { useState, useEffect } from "react";
import { EmblaCarousel } from "../components/Carousel";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original"

function MediaStreaming() {
  const navigate = useNavigate()
  const { mediaType, id } = useParams()
  const [mediaData, setMediaData] = useState(null);
  const [season, setSeason] = useState(1)
  const [imageData, setImageData] = useState();
  const [youtubeData, setYoutubeData] = useState();
  const [nowPlaying, setNowPlaying] = useState();
  const [ep, setEp] = useState(1);
  const [showMore, setShowMore] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {

    async function fetchMedia() {
      try {
        let data;

        if (mediaType === "movie") {
          data = await getMovieById(id);
        } else {
          data = await getSeriesById(id);
        }

        setMediaData(data);
        const images = await getImages(id, mediaType)
        setImageData(images)
        const youtube = await getYoutube(id, mediaType)
        setYoutubeData(youtube)
        const playing = await getNowPlayingMovies()
        setNowPlaying(playing)
      } catch (err) {
        console.error("error")
      }
    }

    fetchMedia();
  }, [mediaType, id]);

  // dopo 3s mostra il trailer al posto dell'immagine
  useEffect(() => {
    setShowTrailer(false);
    const timer = setTimeout(() => setShowTrailer(true), 3000);
    return () => clearTimeout(timer);
  }, [id]);

  if (!mediaData) return <p>Loading...</p>;

  function openMedia() {
    navigate(`/watch/${mediaType}/${mediaData.id}/stream`, { state: { season, ep } })
  }


  const playerUrl = mediaData.name
    ? `https://vixsrc.to/tv/${id}/${season}/${ep}?lang=it`
    : `https://vixsrc.to/movie/${id}?lang=it`;

  // estrai il primo video youtube dai dati
  const youtubeVideo = youtubeData?.results?.find(v => v.site === 'YouTube' && v.type === 'Trailer')
  // Add controls=0, modestbranding=1, rel=0 to hide controls in MediaStreaming detail view
  const youtubeUrl = youtubeVideo
    ? `https://www.youtube.com/embed/${youtubeVideo.key}?&muted=1&autoplay=1&controls=0&modestbranding=1&rel=0`
    : null

  // usa youtube se trovato, per i film usa vixsrc come fallback, per le serie usa solo youtube
  const trailerUrl = youtubeUrl || (mediaData.title ? playerUrl : null)

  return (
    <div className="media-streaming-container">
      <div className="media-hero">
        <div className="media-sidebar">
          <div className="movie-logo-container">
            {imageData?.logos?.[0]?.file_path && (
              <img
                alt={mediaData.title || mediaData.name}
                src={`${IMAGE_BASE_URL}${imageData.logos[0].file_path}`}
                className="movie-logo"
              />
            )}
            <div className="media-info">
              {mediaData.title ? (
                <p className="">{mediaData.release_date?.slice(0, 4)}</p>
              ) : (
                <p>{mediaData.first_air_date?.slice(0, 4)}</p>
              )}
              {mediaData.name && mediaData.seasons?.length > 0 && (
                <p>• {mediaData.seasons.length} Staggioni</p>
              )}
              {mediaData.runtime && <p>• {mediaData.runtime} min</p>}
            </div>
            <div className="media-actions">
              <button onClick={openMedia} className="btn-play">▶ Riproduci</button>

              <div className="progress-ring" style={{ '--progress': mediaData.vote_average ? `${Math.round(mediaData.vote_average * 10)}%` : '0%' }}>
                <span className="progress-text">{mediaData.vote_average ? mediaData.vote_average.toFixed(1) : ''}</span>
              </div>

              <div className="btn-icon">
                <button className="font-bold">✚</button>
              </div>
              <div className="btn-icon">
                <button className="font-bold">❤️</button>
              </div>
            </div>
          </div>

          <div className="media-details">
            <p className={showMore ? "media-overview expanded" : "media-overview clamped"}>
              {mediaData.overview}
            </p>
            <button
              className="read-toggle-btn"
              onClick={() => setShowMore(prev => !prev)}
            >
              {showMore ? "Leggi di meno" : "Leggi di più"}
            </button>
            <div className="media-meta">
              <span className="meta-label">Generi:</span>
              <span className="meta-value">
                {Array.isArray(mediaData.genres) ? mediaData.genres.map(g => g.name).join(", ") : null}
              </span>
            </div>

            {mediaData.name && mediaData.seasons && (
              <div className="selector-group">
                <p className="selector-title">Stagioni:</p>
                <div className="selector-options">
                  {mediaData.seasons
                    .filter(s => s.season_number > 0)
                    .map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          setSeason(s.season_number);
                          setEp(1);
                        }}
                        className={`season-btn ${season === s.season_number ? 'active' : ''}`}
                      >
                        {s.season_number}
                      </button>
                    ))}
                </div>
              </div>
            )}

            {mediaData.name && mediaData.seasons && (
              <div className="selector-group">
                <p className="selector-title">Episodi:</p>
                <div className="selector-options">
                  {Array.from(
                    { length: mediaData.seasons.find(s => s.season_number === season)?.episode_count || 0 },
                    (_, i) => i + 1
                  ).map((episodeNum) => (
                    <button
                      key={episodeNum}
                      onClick={() => setEp(episodeNum)}
                      className={`episode-btn ${ep === episodeNum ? 'active' : ''}`}
                    >
                      {episodeNum}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="media-backdrop">
          {!showTrailer && (
            <div
              className="backdrop-image"
              style={{
                backgroundImage: `url('https://image.tmdb.org/t/p/original${mediaData.backdrop_path}')`
              }}
            />
          )}
          {showTrailer && (
            <iframe
              title="Trailer"
              src={trailerUrl}
              className="trailer-iframe"
              allow="autoplay; fullscreen"
              allowFullScreen
            ></iframe>
          )}
          <div className="backdrop-gradient" />
        </div>
      </div>

      {/* Sezione Now Playing */}
      {nowPlaying && nowPlaying.length > 0 && (
        <div className="now-playing-section">
          <p className="section-title">Al cinema ora</p>
          <EmblaCarousel movies={nowPlaying} />
        </div>
      )}
    </div>
  );
}

export default MediaStreaming;
