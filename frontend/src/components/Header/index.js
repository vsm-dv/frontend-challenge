import './styles.css'
import searchIcon from '../../assets/search-icon.svg';

function Header({ searchTerm, setSearchTerm }) {
    return (
        <header>
            <input
                type="text"
                placeholder='Pesquisar'
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm} />
            <img src={searchIcon} alt="Pesquisar" className='search-icon' />
            <span>Olá Bianca!</span>
        </header>
    )
}

export default Header;