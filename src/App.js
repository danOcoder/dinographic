import React, { useState } from 'react';
import moment from 'moment';

import { Creature } from './constructors';

import data from './dino.json';

import anklyosaurus from './images/anklyosaurus.png';
import brachiosaurus from './images/brachiosaurus.png';
import elasmosaurus from './images/elasmosaurus.png';
import pigeon from './images/pigeon.png';
import pteranodon from './images/pteranodon.png';
import stegosaurus from './images/stegosaurus.png';
import triceratops from './images/triceratops.png';
import tyrannosaurusrex from './images/tyrannosaurus.png';
import human from './images/human.png';

import './App.css';

const dinoImgs = {
  anklyosaurus,
  brachiosaurus,
  elasmosaurus,
  pigeon,
  pteranodon,
  stegosaurus,
  triceratops,
  tyrannosaurusrex
};

function App() {
  const [userName, setUserName] = useState(null);
  const [userHeightFt, setUserHeightFt] = useState(null);
  const [userHeightIn, setUserHeightIn] = useState(null);
  const [userHeight, setUserHeight] = useState(null);
  const [userWeight, setUserWeight] = useState(null);
  const [userDOB, setUserDOB] = useState(null);
  const [userAge, setUserAge] = useState(null);
  const [displayArr, setDisplayArr] = useState([]);
  const [showForm, setHideForm] = useState(true);

  /**
   * @description Sets userHeightFt & userHeightIn the sets userHeight
   * @param {object} event
   */
  const handleUserHeight = (event) => {
    switch (event.target.name) {
      case 'feet':
        setUserHeightFt(parseInt(event.target.value, 10));
        break;
      case 'inches':
        setUserHeightIn(parseInt(event.target.value, 10));
        break;
      default:
        break;
    }
    setUserHeight(userHeightFt * 12 + userHeightIn);
  };

  /**
   * @description Sets userDOB & userAge
   * @param {object} event
   */
  const handleUserAge = (event) => {
    const dob = event.target.value;
    const age = moment().diff(dob, 'years', false);
    setUserDOB(dob);
    setUserAge(age);
  };

  /**
   * @description Handles form submission - calls dino compare methods, sets display array to new array of updated dinos & user, hides form to show info graphic
   * @param {object} event
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    dinoArr.forEach((dino) => {
      dino.compareAge(user.age);
      dino.compareHeight(user.height);
      dino.compareWeight(user.weight);
    });

    setDisplayArr([...dinoArr.slice(0, 4), { ...user }, ...dinoArr.slice(4, 8)]);
    setHideForm(false);
  };

  /**
   * @description Resets form & UI
   * @param {object} event
   */
  const handleFormReset = () => {
    setUserName(null);
    setUserHeightFt(null);
    setUserHeightIn(null);
    setUserHeight(null);
    setUserWeight(null);
    setUserDOB(null);
    setUserAge(null);
    setDisplayArr([]);
    setHideForm(true);
  };

  /**
   * @description Generates random number based on length of array passed to it
   * @param {length} number

   * @returns {number} Random number
   */
  const randomIndex = (length) => Math.floor(Math.random() * length) + 1;

  /**
   * @description Create array of new Dino objects based on values for dino json
   * @returns {array}
   */
  const dinoArr = data.Dinos.map((dino) => {
    let dinosaur = new Creature(
      dino.species,
      dino.weight,
      dino.height,
      dino.when,
      dinoImgs[dino.species.split(' ').join('').toLowerCase()],
      `Cartoon illustration of a ${dino.species}`,
      dino.facts
    );

    return dinosaur;
  });

  // User object
  const user = new Creature(
    userName,
    userWeight,
    userHeight,
    userAge,
    human,
    'Cartoon illustration of a human',
    []
  );

  return (
    <div className='App'>
      <header>
        <h2>Natural History Museum</h2>
        <h1>Dinosaurs</h1>
        <h3>How do you compare?</h3>
      </header>
      <main className='main-content-container'>
        {/* FIXME: Refactor transition between form & grid with react-router & react transition group */}
        {showForm && (
          <form onSubmit={handleSubmit} id='dino-compare'>
            <div className='form-container'>
              <p>Name:</p>
              <label className='visually-hidden' htmlFor='name'>
                Name:
              </label>
              <input
                required
                id='name'
                className='form-field__full'
                type='name'
                name='name'
                value={userName || ''}
                onChange={(e) => setUserName(e.target.value)}
              />
              <p>Height</p>
              <label htmlFor='feet'>
                Feet:{' '}
                <input
                  required
                  id='feet'
                  className='form-field__short'
                  type='number'
                  name='feet'
                  value={userHeightFt || ''}
                  onChange={handleUserHeight}
                />
              </label>
              <label htmlFor='inches'>
                inches:{' '}
                <input
                  required
                  id='inches'
                  className='form-field__short'
                  name='inches'
                  type='number'
                  value={userHeightIn || ''}
                  onChange={handleUserHeight}
                />
              </label>
              <p>Weight (lbs):</p>
              <label htmlFor='weight' className='visually-hidden'>
                Weight (lbs):
              </label>
              <input
                required
                id='weight'
                className='form-field__full'
                type='number'
                name='weight'
                value={userWeight || ''}
                onChange={(e) => setUserWeight(parseInt(e.target.value, 10))}
              />
              <p>DOB:</p>
              <label htmlFor='dob' className='visually-hidden'>
                DOB:
              </label>
              <input
                required
                id='dob'
                className='form-field__full'
                type='date'
                name='dob'
                value={userDOB || ''}
                onChange={handleUserAge}
              />
              <input className='submit-button' type='submit' name='submit' value='Compare Me!' />
            </div>
          </form>
        )}
        {!showForm && (
          <div className='grid-flex-parent'>
            <div id='grid'>
              {displayArr.map((obj) => (
                <div key={obj.species} className='grid-item'>
                  <h3>{obj.species}</h3>
                  <img src={`${obj.img}`} alt={obj.altText} />
                  {obj.facts && <p>{obj.facts[obj.species === 'Pigeon' ? 0 : randomIndex(5)]}</p>}
                </div>
              ))}
            </div>
            <button className='submit-button' onClick={handleFormReset}>
              Compare another human
            </button>
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
