import React, { useState } from 'react';
import './App.css';

import data from './dino.json';

import anklyosaurus from './images/anklyosaurus.png';
import brachiosaurus from './images/brachiosaurus.png';
import elasmosaurus from './images/elasmosaurus.png';
import human from './images/human.png';
import pigeon from './images/pigeon.png';
import pteranodon from './images/pteranodon.png';
import stegosaurus from './images/stegosaurus.png';
import triceratops from './images/triceratops.png';
import tyrannosaurus from './images/tyrannosaurus.png';

function App() {
  const [showForm, setHideForm] = useState(true);
  const [humanName, setHumanName] = useState('');
  const [humanHeightFt, setHumanHeightFt] = useState(null);
  const [humanHeightIn, setHumanHeightIn] = useState(null);
  const [humanWeight, setHumanWeight] = useState(null);
  const [dob, setDob] = useState(null);
  const [humanDiet, setHumanDiet] = useState('');

  const totalHeight = (feet, inches) => {
    const height = parseInt(feet, 10) * 12 + parseInt(inches, 10);
    if (!height) {
      return;
    }
    return height;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');

    setHideForm(false);
  };

  function Dino(species, weight, height, diet, when) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.when = when;
    this.img = '';
    this.altText = '';
    this.facts = [];
  }

  function Human() {
    this.species = 'Human';
    this.weight = humanWeight;
    this.height = totalHeight(humanHeightFt, humanHeightIn);
    this.diet = humanDiet;
    this.when = dob;
    this.img = human;
    this.altText = 'Cartoon illustration of a human';
  }

  const inputData = new Human();

  console.log(inputData);

  const dinoArr = data.Dinos.map((obj) => {
    let dino = new Dino(obj.species, obj.weight, obj.height, obj.diet, obj.when);

    switch (obj.species) {
      case 'Ankylosaurs':
        dino.img = anklyosaurus;
        break;
      case 'Brachiosaurus':
        dino.img = brachiosaurus;
        break;
      case 'Elasmosaurus':
        dino.img = elasmosaurus;
        break;
      case 'Pigeon':
        dino.img = pigeon;
        break;
      case 'Pteranodon':
        dino.img = pteranodon;
        break;
      case 'Stegosaurus':
        dino.img = stegosaurus;
        break;
      case 'Triceratops':
        dino.img = triceratops;
        break;
      case 'Tyrannosaurus Rex':
        dino.img = tyrannosaurus;
        break;
      default:
        break;
    }

    dino.facts.push(obj.fact);
    dino.altText = `Cartoon illustration of a ${obj.species}`;

    return dino;
  });

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
              <input
                id='name'
                className='form-field__full'
                type='name'
                name='name'
                value={humanName || ''}
                onChange={(e) => setHumanName(e.target.value)}
              />
              <p>Height</p>
              <label htmlFor='feet'>
                Feet:{' '}
                <input
                  id='feet'
                  className='form-field__short'
                  type='number'
                  name='feet'
                  value={humanHeightFt || ''}
                  onChange={(e) => setHumanHeightFt(e.target.value)}
                />
              </label>
              <label htmlFor='inches'>
                inches:{' '}
                <input
                  id='inches'
                  className='form-field__short'
                  name='inches'
                  type='number'
                  value={humanHeightIn || ''}
                  onChange={(e) => setHumanHeightIn(e.target.value)}
                />
              </label>
              <p>Weight (lbs):</p>
              <label htmlFor='weight' className='visually-hidden'>
                Weight (lbs):
              </label>
              <input
                id='weight'
                className='form-field__full'
                type='number'
                name='weight'
                value={humanWeight || ''}
                onChange={(e) => setHumanWeight(parseInt(e.target.value, 10))}
              />
              <p>DOB:</p>
              <label htmlFor='dob' className='visually-hidden'>
                DOB:
              </label>
              <input
                id='dob'
                className='form-field__full'
                type='date'
                name='dob'
                value={dob || ''}
                onChange={(e) => setDob(e.target.value)}
              />
              <p>Diet:</p>
              <label className='visually-hidden' htmlFor='diet'>
                Diet:
              </label>
              <select
                id='diet'
                className='form-field__full'
                name='diet'
                value={humanDiet || ''}
                onChange={(e) => setHumanDiet(e.target.value)}
              >
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
            {dinoArr.map((obj) => (
              <div className='grid-item'>
                <h3>{obj.species}</h3>
                <img src={`${obj.img}`} alt={obj.altText} />
                <p>{obj.facts[0]}</p>
              </div>
            ))}
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
