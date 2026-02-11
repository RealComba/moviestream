import { useNavigate } from "react-router-dom";
import "../css/Home.css";
import icon from "../assets/info-icon.svg"
import { useState, useEffect } from "react";
import { getYoutube } from "../services/api";

function HeroBanner({ media }) {
  const navigate = useNavigate();
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    if (!media?.id) return;

    // Reset state when media changes
    setShowTrailer(false);
    setTrailerKey(null);

    const fetchTrailer = async () => {
      try {
        const mediaType = media.title ? "movie" : "tv";
        const youtubeData = await getYoutube(media.id, mediaType);
        const trailer = youtubeData?.results?.find(
          v => v.site === 'YouTube' && v.type === 'Trailer'
        );
        if (trailer) setTrailerKey(trailer.key);
      } catch (e) {
        console.error("Failed to fetch trailer", e);
      }
    };

    fetchTrailer();

    // Auto-play trailer after 5 seconds if trailer exists
    const timer = setTimeout(() => {
      setShowTrailer(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [media]);

  if (!media) return null;

  const title = media.title || media.name;
  const hasBackdrop = Boolean(media.backdrop_path);
  const bgUrl = hasBackdrop
    ? `https://image.tmdb.org/t/p/original${media.backdrop_path}`
    : undefined;

  const handleWatch = () => {
    const mediaType = media.title ? "movie" : "tv";
    navigate(`/watch/${mediaType}/${media.id}`);
  };

  // YouTube Embed URL parameters to hide UI
  // controls=0: Hide bottom player controls
  // modestbranding=1: Minimize YouTube logo
  // rel=0: Don't show related videos from other channels
  // iv_load_policy=3: Hide annotations
  // disablekb=1: Disable keyboard
  const youtubeEmbedUrl = trailerKey
    ? `https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&loop=1&playlist=${trailerKey}`
    : null;

  return (
    <section
      className="hero-banner"
      aria-label={title}
    >
      {/* Background Image Layer */}
      <div
        className={`hero-bg-image ${showTrailer && trailerKey ? 'fade-out' : 'fade-in'}`}
        style={
          hasBackdrop
            ? {
              backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.75)), url('${bgUrl}')`,
            }
            : undefined
        }
      ></div>

      {/* YouTube Trailer Layer */}
      {showTrailer && trailerKey && (
        <div className="hero-trailer">
          <iframe
            src={youtubeEmbedUrl}
            title="Trailer"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100%', // Changed from 100vw
              height: '100%', // Changed from 100vh
              minWidth: '100%',
              minHeight: '100%',
              transform: 'translate(-50%, -50%) scale(1.35)', // Keep scale for zoom effect
              pointerEvents: 'none'
            }}
          />
        </div>
      )}

      <div className="hero-gradient-overlay"></div>

      {/* Content Overlay */}
      <div className="hero__content">
        <h1 className="hero__title">{title}</h1>
        {media.overview && (
          <p className="hero__overview hero__overview--clamp">{media.overview}</p>
        )}
        <div className="hero__actions">
          <button className="hero__btn hero__btn--primary" onClick={handleWatch}>
            ▶ Guarda ora
          </button>
          <button className="hero__btn hero__btn--secondary" onClick={handleWatch}>
            <img className="icon-sm" src={icon} alt="" style={{ width: '20px', height: '20px' }} />
            Altre Info
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
