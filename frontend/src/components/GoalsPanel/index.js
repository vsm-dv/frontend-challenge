import './styles.css';
import checkIcon from '../../assets/check-icon.svg';
import deleteIcon from '../../assets/delete-icon.svg';
import restoreIcon from '../../assets/restore-icon.svg';

function GoalsPanel({ showBackdrop, showDeleted, mainGoals, deletedGoals, finishGoal, deleteGoal, restoreGoal, searchTerm, filteredGoals }) {
  return (
    <div className="goals-panel">
      <button onClick={() => showBackdrop()}>Novo objetivo</button>

      {(!searchTerm && !showDeleted) &&
        mainGoals.map(goal => (
          <div key={goal.id} className={`goal ${goal.status === 'done' && 'background-finished'}`}>
            <div className="goal-card">
              <div className="goal-info">
                <h1>{goal.title}</h1>
                <p>{goal.description}</p>
                <span className='category'>{goal.categoryName}</span> <br />
              </div>

              <div className="goal-actions">
                <div className="goal-buttons">
                  <img src={checkIcon} alt="" onClick={() => finishGoal(goal.id)} />
                  <img src={deleteIcon} alt="" onClick={() => deleteGoal(goal.id)} />
                </div>
                <span className='added-in'>
                  {goal.status === 'done' ? 'finalizado' : 'criado'} em:
                  {goal.status === 'done' ? goal.achievedAt : goal.createdAt}</span>
              </div>
            </div>
          </div>
        ))}

      {(!searchTerm && showDeleted) &&
        deletedGoals.map(goal => (
          <div key={goal.id} className={`goal ${goal.status === 'deleted' && 'background-deleted'}`}>
            <div className="goal-card">
              <div className="goal-info">
                <h1>{goal.title}</h1>
                <p>{goal.description}</p>
                <span className='category'>{goal.categoryName}</span> <br />
              </div>

              <div className="goal-actions">
                <div className="goal-buttons">
                  <img src={restoreIcon} alt="" onClick={() => restoreGoal(goal.id)} />
                </div>
                <span className='added-in'>removido em: {goal.deletedAt}</span>
              </div>
            </div>
          </div>
        ))}

      {searchTerm &&
        filteredGoals.map(goal => (
          <div key={goal.id}
            className={`goal ${goal.status === 'done' ? 'background-finished'
              : goal.status === 'deleted' ? 'background-deleted' : ''}`}>
            <div className="goal-card">
              <div className="goal-info">
                <h1>{goal.title}</h1>
                <p>{goal.description}</p>
                <span className='category'>{goal.categoryName}</span> <br />
              </div>

              <div className="goal-actions">
                <div className="goal-buttons">
                  <img src={goal.status !== 'deleted' ? checkIcon : restoreIcon}
                    alt=""
                    onClick={goal.status !== 'deleted' ? () => finishGoal(goal.id) : () => restoreGoal(goal.id)} />

                  {goal.status !== 'deleted' &&
                    <img src={deleteIcon} alt="" onClick={() => deleteGoal(goal.id)} />}
                </div>
                <span className='added-in'>
                  {goal.status === 'done' ? 'finalizado'
                    : goal.status === 'active' ? 'criado' : 'removido'} em:
                  {goal.status === 'done' ? goal.achievedAt
                    : goal.status === 'active' ? goal.createdAt : goal.deletedAt}</span>
              </div>
            </div>
          </div>
        ))}
    </div>

  )
}

export default GoalsPanel;