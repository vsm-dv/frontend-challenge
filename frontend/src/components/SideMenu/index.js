import goalsIcon from '../../assets/goals-icon.svg';
import logo from '../../assets/logo.svg';
import trashIcon from '../../assets/trash-icon.svg';
import './styles.css';

function SideMenu({ showMainGoals, showDeletedGoals, showDeleted }) {
    return (
        <div className="side-menu">
            <img src={logo} alt="logo" className='logo' />
            <div className="menu-items">
                <div className={`menu-item ${!showDeleted && 'item-selected'}`} onClick={() => showMainGoals()}>
                    <img src={goalsIcon} alt="objetivos" />
                    <span>Objetivos</span>
                </div>
                <div className={`menu-item ${showDeleted && 'item-selected'}`} onClick={() => showDeletedGoals()}>
                    <img src={trashIcon} alt="excluidos" />
                    <span>Excluídos</span>
                </div>
            </div>
        </div>
    )
}

export default SideMenu;