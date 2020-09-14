import React, { useState } from 'react';
import moment from 'moment';

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
  const [humanName, setHumanName] = useState(null);
  const [humanHeightFt, setHumanHeightFt] = useState(null);
  const [humanHeightIn, setHumanHeightIn] = useState(null);
  const [humanWeight, setHumanWeight] = useState(null);
  const [dob, setDob] = useState(null);
  const [displayArr, setDisplayArr] = useState([]);

  const totalHeight = (feet, inches) => {
    const height = parseInt(feet, 10) * 12 + parseInt(inches, 10);
    if (!height) {
      return;
    }
    return height;
  };

  const randomIndex = (length) => Math.floor(Math.random() * length) + 1;

  const handleSubmit = (e) => {
    e.preventDefault();
    dinoArr.forEach((dino) => {
      dino.compareAge(userData.age);
      dino.compareHeight(userData.height);
      dino.compareWeight(userData.weight);
    });

    setDisplayArr(dinoArr);

    setHideForm(false);
  };

  function Dino(species, weight, height, when) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.when = when;
    this.img = '';
    this.altText = '';
    this.facts = [];
  }

  Dino.prototype.addFact = function (fact) {
    this.facts.push(fact);
  };

  Dino.prototype.compareAge = function (ageToCompare) {
    this.addFact(`Looks like you missed ${this.species} by ${this.when - ageToCompare} years`);
  };

  Dino.prototype.compareHeight = function (heightToCompare) {
    if (heightToCompare > this.height) {
      this.addFact(`You are ${heightToCompare - this.height} inches taller than a ${this.species}`);
    } else {
      this.addFact(`A ${this.species} was ${this.height - heightToCompare} inches taller than you`);
    }
  };

  Dino.prototype.compareWeight = function (weightToCompare) {
    if (weightToCompare > this.weight) {
      this.addFact(
        `You are ${weightToCompare - this.weight} pounds heavier than a ${this.species}`
      );
    } else {
      this.addFact(
        `A ${this.species} was ${this.weight - weightToCompare} pounds heavier than you`
      );
    }
  };

  function Human(name, weight, height, age) {
    this.species = name;
    this.weight = weight;
    this.height = height;
    this.age = moment().diff(age, 'years', false);
    this.img = human;
    this.altText = 'Cartoon illustration of a human';
  }

  const userData = new Human(
    humanName,
    humanWeight,
    totalHeight(humanHeightFt, humanHeightIn),
    dob
  );

  const dinoArr = data.Dinos.map((obj) => {
    let dino = new Dino(obj.species, obj.weight, obj.height, obj.when);

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

    dino.facts = obj.facts;
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
              <input className='submit-button' type='submit' name='submit' value='Compare Me!' />
            </div>
          </form>
        )}
        {!showForm && (
          <div id='grid'>
            {displayArr.map((obj) => (
              <div className='grid-item'>
                <h3>{obj.species}</h3>
                <img src={`${obj.img}`} alt={obj.altText} />
                {obj.facts && <p>{obj.facts[obj.species === 'Pigeon' ? 0 : randomIndex(5)]}</p>}
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
