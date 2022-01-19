import './styles.css'
import searchIcon from '../../assets/search-icon.svg';

function Header() {
    return (
        <header>
            <input type="text" placeholder='Pesquisar' />
            <img src={searchIcon} alt="Pesquisar" className='search-icon' />
            <span>Olá Bianca!</span>
        </header>
    )
}

export default Header;