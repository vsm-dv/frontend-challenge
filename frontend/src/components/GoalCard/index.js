import './styles.css'

function GoalCard({ title, description, category, statusText, date, background, src1, src2, id, function1, function2 }) {
    return (
        <div className={`goal ${background}`}>
            <div className="goal-card">
                <div className="goal-info">
                    <h1>{title}</h1>
                    <p>{description}</p>
                    <span className='category'>{category}</span> <br />
                </div>

                <div className="goal-actions">
                    <div className="goal-buttons">
                        <img src={src1} alt="" onClick={() => function1(id)} />
                        <img src={src2} alt="" onClick={() => function2(id)} />
                    </div>
                    <span className='added-in'>{statusText} em: {date}</span>
                </div>
            </div>
        </div>
    )
}

export default GoalCard;