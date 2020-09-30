export function Creature(species, weight, height, age, image, altText, facts) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.age = age;
  this.image = image;
  this.altText = altText;
  this.facts = facts;
}

// Convenience function - pushes facts to facts array
Creature.prototype.addFact = function (fact) {
  this.facts.push(fact);
};

// Calculates difference between period dino existed & age of user
Creature.prototype.compareAge = function (ageToCompare) {
  this.addFact(`Looks like you missed ${this.species} by ${this.when - ageToCompare} years`);
};

// Calculates difference between height of human & height of dino
Creature.prototype.compareHeight = function (heightToCompare) {
  if (heightToCompare > this.height) {
    this.addFact(`You are ${heightToCompare - this.height} inches taller than a ${this.species}`);
  } else {
    this.addFact(`A ${this.species} was ${this.height - heightToCompare} inches taller than you`);
  }
};

// Calculates difference between weight of human & weight of dino
Creature.prototype.compareWeight = function (weightToCompare) {
  if (weightToCompare > this.weight) {
    this.addFact(`You are ${weightToCompare - this.weight} pounds heavier than a ${this.species}`);
  } else {
    this.addFact(`A ${this.species} was ${this.weight - weightToCompare} pounds heavier than you`);
  }
};
