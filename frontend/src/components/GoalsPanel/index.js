import './styles.css'
import checkIcon from '../../assets/check-icon.svg';
import deleteIcon from '../../assets/delete-icon.svg';
import restoreIcon from '../../assets/restore-icon.svg';

function GoalsPanel({ showDeleted, mainGoals, deletedGoals, finishGoal, deleteGoal, restoreGoal }) {
  return (
    <div className="goals-panel">
      <button>Novo objetivo</button>

      {!showDeleted && mainGoals.map(goal => (
        <div className={`goal ${goal.status === 'done' && 'background-finished'}`}>
          <div className="goal-card" key={goal.id}>
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

      {showDeleted && deletedGoals.map(goal => (
        <div className={`goal ${goal.status === 'deleted' && 'background-deleted'}`}>
          <div className="goal-card" key={goal.id}>
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
    </div>

  )
}

export default GoalsPanel;