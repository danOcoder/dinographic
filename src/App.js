import React, { useState } from 'react';
import moment from 'moment';

import { Creature } from './constructors';

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

import './App.css';

function App() {
  const [showForm, setHideForm] = useState(true);
  const [userName, setUserName] = useState('');
  const [userHeightFt, setUserHeightFt] = useState(0);
  const [userHeightIn, setUserHeightIn] = useState(0);
  const [userHeight, setUserHeight] = useState(0);
  const [userWeight, setUserWeight] = useState(0);
  const [dob, setDob] = useState(null);
  const [displayArr, setDisplayArr] = useState([]);

  // User object
  const user = {
    name: userName,
    heightFt: userHeightFt,
    heightIn: userHeightIn,
    totalHeight: function () {
      return parseInt(this.heightFt, 10) * 12 + parseInt(this.heightIn, 10);
    },
    weight: userWeight,
    age: moment().diff(dob, 'years', false),
    img: human,
    altText: 'Cartoon illustration of a human'
  };

  // species, weight, height, when, image, altText, facts;
  // const newUser = Creature(userName, userHeight);

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

  const handleUserAge = (event) => {
    setDob(moment().diff(event.target.value, 'years', false));
  };

  console.log(dob);

  // Generates random index value based on length of array passed to it
  const randomIndex = (length) => Math.floor(Math.random() * length) + 1;

  // Preforms actions required on submission of the form
  const handleSubmit = (e) => {
    e.preventDefault();

    dinoArr.forEach((dino) => {
      dino.compareAge(user.age);
      dino.compareHeight(user.totalHeight());
      dino.compareWeight(user.weight);
    });

    user.species = user.name;

    setDisplayArr([...dinoArr.slice(0, 4), { ...user }, ...dinoArr.slice(4, 8)]);

    setHideForm(false);
  };

  // Resets form & UI
  const handleFormReset = () => {
    setUserName(null);
    setUserHeightFt(null);
    setUserHeightIn(null);
    setUserWeight(null);
    setDob(null);
    setDisplayArr([]);

    setHideForm(true);
  };

  // Dino constructor function
  function Dino(species, weight, height, when, facts) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.when = when;
    this.facts = facts;
  }

  // Convenience function - pushes facts to facts array
  Dino.prototype.addFact = function (fact) {
    this.facts.push(fact);
  };

  // Calculates difference between period dino existed & age of user
  Dino.prototype.compareAge = function (ageToCompare) {
    this.addFact(`Looks like you missed ${this.species} by ${this.when - ageToCompare} years`);
  };

  // Calculates difference between height of human & height of dino
  Dino.prototype.compareHeight = function (heightToCompare) {
    if (heightToCompare > this.height) {
      this.addFact(`You are ${heightToCompare - this.height} inches taller than a ${this.species}`);
    } else {
      this.addFact(`A ${this.species} was ${this.height - heightToCompare} inches taller than you`);
    }
  };

  // Calculates difference between weight of human & weight of dino
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

  // Create array of new Dino invocations based on values for dino json
  const dinoArr = data.Dinos.map((obj) => {
    let dino = new Dino(obj.species, obj.weight, obj.height, obj.when, obj.facts);

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
                value={dob || ''}
                // onChange={(e) => setDob(e.target.value)}
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
