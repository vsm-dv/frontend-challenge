import './App.css';
import { useEffect, useState } from 'react';
import SideMenu from './components/SideMenu';
import Header from './components/Header';
import GoalCard from './components/GoalCard';
import checkIcon from './assets/check-icon.svg';
import deleteIcon from './assets/delete-icon.svg';
import restoreIcon from './assets/restore-icon.svg';

function App() {
  const [allGoals, setAllGoals] = useState([]);
  const [mainGoals, setMainGoals] = useState([]);
  const [deletedGoals, setDeletedGoals] = useState([]);
  const [showDeleted, setShowDeleted] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllGoals();
    getCategories();
  }, []);

  categories.forEach(category => {
    allGoals.forEach(goal => {
      if (goal.category === category.id) {
        goal.categoryName = category.name;
      }
    });
  });

  function showMainGoals() {
    setShowDeleted(false);
    console.log(showDeleted, ' main');
  }

  function showDeletedGoals() {
    setShowDeleted(true);
    console.log(showDeleted, ' deleted');
  }

  async function getCategories() {
    try {
      const response = await fetch('http://localhost:3001/categories/', {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      });

      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.log(error.message)
    }
  }

  async function getAllGoals() {
    try {
      const response = await fetch('http://localhost:3001/targets/', {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      });

      const data = await response.json();
      setAllGoals(data);
      setMainGoals(data.filter(goal => goal.status !== 'deleted'));
      setDeletedGoals(data.filter(goal => goal.status === 'deleted'));
    } catch (error) {
      console.log(error.message)
    }
  }

  async function finishGoal(id) {
    const arrayDate = new Date().toLocaleDateString('pt-br', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    })
      .split('/');

    const body = {
      status: "done",
      achievedAt: `${arrayDate[2]}-${arrayDate[1]}-${arrayDate[0]}`
    }

    try {
      await fetch(`http://localhost:3001/targets/${id}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      await getAllGoals();
    } catch (error) {
      console.log(error.message);
    }
  }

  async function deleteGoal(id) {
    try {
      const goal = allGoals.find(goal => goal.id === id);
      if (goal.status !== 'active') return;

      const arrayDate = new Date().toLocaleDateString('pt-br', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      })
        .split('/');

      const body = {
        status: "deleted",
        achievedAt: `${arrayDate[2]}-${arrayDate[1]}-${arrayDate[0]}`
      }

      await fetch(`http://localhost:3001/targets/${id}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      await getAllGoals();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='App'>
      <SideMenu showMainGoals={showMainGoals} showDeletedGoals={showDeletedGoals} />

      <div className="main">
        <Header />
        <div className="goals-panel">
          <button>Novo objetivo</button>
          {!showDeleted && mainGoals.map(goal => (
            <GoalCard
              key={goal.id}
              title={goal.title}
              description={goal.description}
              category={goal.categoryName}
              statusText={goal.status === 'done' ? 'finalizado' : 'criado'}
              date={goal.status === 'done' ? goal.achievedAt : goal.createdAt}
              background={goal.status === 'done' && 'background-finished'}
              src1={checkIcon}
              src2={deleteIcon}
              id={goal.id}
              function1={finishGoal}
              function2={deleteGoal}
            />
          ))}

          {showDeleted && deletedGoals.map(goal => (
            <GoalCard
              key={goal.id}
              title={goal.title}
              description={goal.description}
              category={goal.categoryName}
              date={goal.createdAt}
              statusText={'removido'}
              background={'background-deleted'}
              src1={''}
              src2={restoreIcon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;