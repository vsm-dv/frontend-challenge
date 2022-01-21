import './styles.css';
import menuIcon from '../../assets/menu-icon.svg';
import logoIcon from '../../assets/logo-icon.svg';
import closeIcon from '../../assets/close-icon.svg';
import goalsIcon from '../../assets/goals-icon.svg';
import trashIcon from '../../assets/trash-icon.svg';

import { useState } from 'react';


function Header({ searchTerm, setSearchTerm, showMainGoals, showDeletedGoals }) {
  const [topMenuOpen, setTopMenuOpen] = useState(false);

  function selectMainGoals() {
    setTopMenuOpen(!topMenuOpen);
    showMainGoals();
  }

  function selectDeletedGoals() {
    setTopMenuOpen(!topMenuOpen);
    showDeletedGoals();
  }

  return (
    <>
      <div className="top-menu">
        <img src={logoIcon} alt="" />
        <img src={menuIcon} alt=""
          onClick={() => setTopMenuOpen(!topMenuOpen)} />
      </div>

      {topMenuOpen && <div className="menu-options">
        <img className='icon-close-menu' src={closeIcon} alt=""
          onClick={() => setTopMenuOpen(!topMenuOpen)} />

        <div className="btn-options">
          <button onClick={() => selectMainGoals()}>
            <img src={goalsIcon} alt="objetivos" />
            <span>Objetivos</span>
          </button>
          <button onClick={() => selectDeletedGoals()}>
            <img src={trashIcon} alt="excluidos" />
            <span>Excluídos</span>
          </button>
        </div>
      </div>}

      <header>
        <input
          type="text"
          placeholder='Pesquisar'
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm} />
        <span>Olá Bianca!</span>
      </header>
    </>
  )
}

export default Header;