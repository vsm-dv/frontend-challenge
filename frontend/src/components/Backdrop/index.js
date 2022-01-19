import './styles.css';
import { useState } from 'react';
import closeIcon from '../../assets/close-icon.svg';

function Backdrop({ backdropVisible, closeBackdrop, getAllGoals, categories }) {
  const [formInputs, setFormInputs] = useState({
    title: '',
    description: '',
    category: ''
  });

  function handleChange(event) {
    setFormInputs({ ...formInputs, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!formInputs.title || !formInputs.description || !formInputs.category) return;

    const arrayDate = new Date().toLocaleDateString('pt-br', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    }).split('/');

    categories.forEach(category => {
      if (String(category.name).toLowerCase() === String(formInputs.category).toLowerCase()) {
        formInputs.category = category.id;
        console.log(category.name, formInputs.category)
      }
    });

    const body = {
      title: formInputs.title,
      description: formInputs.description,
      category: formInputs.category,
      createdAt: `${arrayDate[2]}-${arrayDate[1]}-${arrayDate[0]}`,
      status: 'active',
    }

    try {
      await fetch('http://localhost:3001/targets', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      await getAllGoals();
      closeBackdrop();
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className={`backdrop ${backdropVisible}`}>
      <div className="backdrop-container">
        <div className="title-button">
          <h1>Adicionar objetivo</h1>
          <img src={closeIcon} alt="Fechar" onClick={() => closeBackdrop()} />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="title">Título</label>
            <input type="text" name='title' onChange={handleChange} value={formInputs.title} />
          </div>

          <div className="input-container">
            <label htmlFor="description">Descrição</label>
            <input type="text" name='description' onChange={handleChange} value={formInputs.description} />
          </div>
          <div className="input-container">
            <label htmlFor="category">Categoria</label>
            <input type="text" name='category' onChange={handleChange} value={formInputs.category} />
          </div>
          <button className='form-button'>Adicionar</button>
        </form>
      </div>
    </div>
  )
}

export default Backdrop;