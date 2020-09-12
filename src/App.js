import React, { useState } from 'react';
import './App.css';

import data from './dino.json';

function App() {
  const [showForm, setHideForm] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');

    setHideForm(false);
  };

  return (
    <div className='App'>
      <header>
        <h2>Natural History Museum</h2>
        <h1>Dinosaurs</h1>
        <h3>How do you compare?</h3>
      </header>
      <main className='main-content-container'>
        {showForm && (
          <form onSubmit={handleSubmit} id='dino-compare'>
            <div className='form-container'>
              <p>Name:</p>
              <label className='visually-hidden' htmlFor='name'>
                Name:
              </label>
              <input id='name' className='form-field__full' type='name' name='name' />
              <p>Height</p>
              <label htmlFor='feet'>
                Feet: <input id='feet' className='form-field__short' type='number' name='feet' />
              </label>
              <label htmlFor='inches'>
                inches:{' '}
                <input id='inches' className='form-field__short' type='number' name='inches' />
              </label>
              <p>Weight:</p>
              <label htmlFor='weight'>
                <input id='weight' className='form-field__full' type='number' name='weight' />
                lbs
              </label>
              <p>Diet:</p>
              <label className='visually-hidden' htmlFor='diet'>
                Diet:
              </label>
              <select id='diet' className='form-field__full' name='diet'>
                <option>Herbavor</option>
                <option>Omnivor</option>
                <option>Carnivor</option>
              </select>
              <input className='submit-button' type='submit' name='submit' value='Compare Me!' />
            </div>
          </form>
        )}
        {!showForm && (
          <div id='grid'>
            {data.Dinos.map((obj) => (
              <div className='grid-item'>
                <h3>{obj.species}</h3>
                <p>{obj.fact}</p>
              </div>
            ))}
            <div className='grid-item'>
              <h3>What is that?</h3>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>
          </div>
        )}
      </main>
      <footer>
        <p className='fine-print'>
          Data Sourced from <a href='https://www.wikipedia.org/'>Wikipedia.org</a>, all numbers are
          approximations.
        </p>
      </footer>
    </div>
  );
}

export default App;
