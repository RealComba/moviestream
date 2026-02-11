import { Link, useNavigate } from 'react-router-dom'
import "../css/NavBar.css"
import { useSearchContext } from "../contexts/SearchContext";
import { useState } from 'react';

function NavBar() {
    const { searchName, triggerSearch } = useSearchContext();
    const navigate = useNavigate();
    const [localSearch, setLocalSearch] = useState(searchName);

    const handleSearch = (e) => {
        e.preventDefault();
        triggerSearch(localSearch);
        navigate('/');
    }

    return (
        <div>
            <div className="navbar">
                <div className="navbar-brand">
                    <Link to="/">Movie App</Link>
                </div>
                <div className="navbar-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/favorites" className="nav-link">Favorites</Link>
                </div>

                <form className="search-form" onSubmit={handleSearch}>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Cerca film o serie..."
                        value={localSearch}
                        onChange={(e) => setLocalSearch(e.target.value)}
                    />
                    <button type="submit" className="search-btn">🔍</button>
                </form>

                <div className="navbar-burger">
                    {/* Placeholder for burger if needed, or controlled via CSS/external lib */}
                    <button className="custom-burger-button">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NavBar