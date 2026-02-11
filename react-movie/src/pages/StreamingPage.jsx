import { useLocation, useParams } from "react-router-dom";

function StreamingPage() {
    const { mediaType, id } = useParams();
    const location = useLocation();
    const { season = 1, ep = 1 } = location.state || {};

    const playerUrl = mediaType === "movie"
        ? `https://vixsrc.to/movie/${id}?lang=it`
        : `https://vixsrc.to/tv/${id}/${season}/${ep}?lang=it`;

    return (
        <div style={{ position: "relative", width: "100%", height: "100vh", background: "#000" }}>
            <button
                onClick={() => window.history.back()}
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    zIndex: 100,
                    background: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    border: '1px solid white',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    fontSize: '20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                ←
            </button>
            <iframe
                title="Player"
                src={playerUrl}
                allow="autoplay; fullscreen"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                allowFullScreen
            ></iframe>
        </div>
    );
}

export default StreamingPage;