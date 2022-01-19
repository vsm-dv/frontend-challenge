import './styles.css'

function GoalCard({ showDeleted, mainGoals, deletedGoals, src1, src2, src3, function1, function2, function3 }) {
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
                <img src={src1} alt="" onClick={() => function1(goal.id)} />
                <img src={src2} alt="" onClick={() => function2(goal.id)} />
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
                <img src={src3} alt="" onClick={() => function3(goal.id)} />
              </div>
              <span className='added-in'>removido em: {goal.deletedAt}</span>
            </div>
          </div>
        </div>
      ))}
    </div>

  )
}

export default GoalCard;