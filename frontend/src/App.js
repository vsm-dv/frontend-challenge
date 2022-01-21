import './App.css';
import { useEffect, useState } from 'react';
import SideMenu from './components/SideMenu';
import Header from './components/Header';
import GoalsPanel from './components/GoalsPanel';
import Backdrop from './components/Backdrop';

function App() {
  const [allGoals, setAllGoals] = useState([]);
  const [mainGoals, setMainGoals] = useState([]);
  const [deletedGoals, setDeletedGoals] = useState([]);
  const [showDeleted, setShowDeleted] = useState(false);
  const [categories, setCategories] = useState([]);
  const [backdropVisible, setBackdropVisible] = useState('hidden');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGoals, setFilteredGoals] = useState([]);

  useEffect(() => {
    getAllGoals();
    getCategories();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      return;
    }
    setFilteredGoals(allGoals.filter(goal => goal.title.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm])

  categories.forEach(category => {
    allGoals.forEach(goal => {
      if (goal.category === category.id) {
        goal.categoryName = category.name;
      }
    });
  });

  function showBackdrop() {
    setBackdropVisible('');
    setSearchTerm('');
  }

  function closeBackdrop() {
    setBackdropVisible('hidden');
  }

  function showMainGoals() {
    setShowDeleted(false);
    setSearchTerm('');
  }

  function showDeletedGoals() {
    setShowDeleted(true);
    setSearchTerm('');
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
    }).split('/');

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

      setSearchTerm('');
      await getAllGoals();
    } catch (error) {
      console.log(error.message);
    }
  }

  async function deleteGoal(id) {
    const goal = allGoals.find(goal => goal.id === id);
    if (goal.status !== 'active') return;

    const arrayDate = new Date().toLocaleDateString('pt-br', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    }).split('/');

    const body = {
      status: "deleted",
      deletedAt: `${arrayDate[2]}-${arrayDate[1]}-${arrayDate[0]}`
    }

    try {
      await fetch(`http://localhost:3001/targets/${id}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      setSearchTerm('');
      await getAllGoals();
    } catch (error) {
      console.log(error.message);
    }
  }

  async function restoreGoal(id) {
    const goal = allGoals.find(goal => goal.id === id);
    if (goal.status !== 'deleted') return;

    const body = {
      status: "active",
      deletedAt: ""
    }

    try {
      await fetch(`http://localhost:3001/targets/${id}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      setSearchTerm('');
      await getAllGoals();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <SideMenu showDeleted={showDeleted}
        showMainGoals={showMainGoals}
        showDeletedGoals={showDeletedGoals} />

      <div className="main">
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showMainGoals={showMainGoals}
          showDeletedGoals={showDeletedGoals}
        />

        <GoalsPanel
          showBackdrop={showBackdrop}
          showDeleted={showDeleted}
          mainGoals={mainGoals}
          deletedGoals={deletedGoals}
          finishGoal={finishGoal}
          deleteGoal={deleteGoal}
          restoreGoal={restoreGoal}
          searchTerm={searchTerm}
          filteredGoals={filteredGoals}
        />
      </div>
      <Backdrop
        backdropVisible={backdropVisible}
        closeBackdrop={closeBackdrop}
        getAllGoals={getAllGoals}
        categories={categories}
      />
    </>
  );
}

export default App;
