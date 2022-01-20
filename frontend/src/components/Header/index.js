import './styles.css'

function Header({ searchTerm, setSearchTerm }) {
    return (
        <header>
            <input
                type="text"
                placeholder='Pesquisar'
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm} />
            <span>Olá Bianca!</span>
        </header>
    )
}

export default Header;