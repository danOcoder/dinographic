import React from 'react';
import './App.css';

function App() {
  return (
    <div className='App'>
      <header>
        <h2>Natural History Museum</h2>
        <h1>Dinosaurs</h1>
        <h3>How do you compare?</h3>
      </header>
      <form id='dino-compare'>
        <div className='form-container'>
          <p>Name:</p>
          <input id='name' className='form-field__full' type='name' name='name' />
          <p>Height</p>
          <label>
            Feet: <input id='feet' className='form-field__short' type='number' name='feet' />
          </label>
          <label>
            inches: <input id='inches' className='form-field__short' type='number' name='inches' />
          </label>
          <p>Weight:</p>
          <label>
            <input id='weight' className='form-field__full' type='number' name='weight' />
            lbs
          </label>
          <p>Diet:</p>
          <select id='diet' className='form-field__full' name='diet'>
            <option>Herbavor</option>
            <option>Omnivor</option>
            <option>Carnivor</option>
          </select>
          <div id='btn'>Compare Me!</div>
        </div>
      </form>
      <main id='grid'></main>
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
