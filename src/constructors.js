/**
* @description Represents a creature
* @constructor
* @param {string} species - Name of the creature
* @param {number} weight - Weight of the creature
* @param {number} height - Height of the creature
* @param {number} age - Age of the creature
* @param {string} image - Path to image of the creature
* @param {string} altText - Description of image of creature
* @param {array} facts - Array of facts about the creature

*/
export function Creature(species, weight, height, age, image, altText, facts) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.age = age;
  this.image = image;
  this.altText = altText;
  this.facts = facts;
}

/**
 * @description Convenience function - pushes facts to facts array
 * @param {string} fact
 */
Creature.prototype.addFact = function (fact) {
  this.facts.push(fact);
};

/**
 * @description Creates fact regarding difference between period species existed & age passed to compare and calls addFact
 * @param {number} ageToCompare
 */
Creature.prototype.compareAge = function (ageToCompare) {
  this.addFact(`Looks like you missed ${this.species} by ${this.age - ageToCompare} years`);
};

/**
 * @description Creates fact regarding difference between height of species & height passed to compare and calls addFact
 * @param {number} heightToCompare
 */
Creature.prototype.compareHeight = function (heightToCompare) {
  if (heightToCompare > this.height) {
    this.addFact(`You are ${heightToCompare - this.height} inches taller than a ${this.species}`);
  } else {
    this.addFact(`A ${this.species} was ${this.height - heightToCompare} inches taller than you`);
  }
};

/**
 * @description Creates fact regarding difference between weight of species & weight passed to compare and calls addFact
 * @param {number} weightToCompare
 */
Creature.prototype.compareWeight = function (weightToCompare) {
  if (weightToCompare > this.weight) {
    this.addFact(`You are ${weightToCompare - this.weight} pounds heavier than a ${this.species}`);
  } else {
    this.addFact(`A ${this.species} was ${this.weight - weightToCompare} pounds heavier than you`);
  }
};
