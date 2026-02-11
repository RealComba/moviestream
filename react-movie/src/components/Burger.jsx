import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom'
import { useSearchContext } from '../contexts/SearchContext'
import { useState } from 'react'
import '../css/Navbar.css'

function Burger() {
	const { searchName, setSearchName, handleSearch, setIsSearchingSeries } = useSearchContext()
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="burger-wrapper">
			<button
				className="custom-burger-button"
				aria-label={isOpen ? 'Chiudi menu' : 'Apri menu'}
				onClick={() => setIsOpen(true)}
			>
				<span />
				<span />
				<span />
			</button>

			<Menu
				right
				width={260}
				isOpen={isOpen}
				onStateChange={(state) => setIsOpen(state.isOpen)}
				customBurgerIcon={false}
				disableCloseButton={true}
			>
				{/* close button inside menu */}
				<button className="bm-close-btn" onClick={() => setIsOpen(false)} aria-label="Chiudi menu">✕</button>
				<div className="bm-search">
					<form onSubmit={(e) => { handleSearch(e); setIsOpen(false); }} className="bm-search-form">
						<input
							type="text"
							placeholder="Cerca..."
							value={searchName}
							onChange={(e) => setSearchName(e.target.value)}
							className="bm-search-input"
						/>
						<button type="submit" className="bm-search-btn">Cerca</button>
					</form>
				</div>

				<nav className="bm-nav">
					<Link to="/" className="bm-item" onClick={() => setIsOpen(false)}>Home</Link>
					<Link to="/series" className="bm-item" onClick={() => { setIsSearchingSeries(true); setIsOpen(false); }}>Serie</Link>
					<Link to="/favorites" className="bm-item" onClick={() => setIsOpen(false)}>Preferiti</Link>
				</nav>
			</Menu>
		</div>
	)
}

export default Burger

