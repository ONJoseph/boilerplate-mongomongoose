require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Log to see if the MONGO_URI is correctly loaded from .env
const uri = process.env.MONGO_URI;
console.log('Using MONGO_URI:', uri);

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Define the schema for Person
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});

// Create the Person model
const Person = mongoose.model('Person', personSchema);

// Create and save a Person document
const createAndSavePerson = (done) => {
  const person = new Person({
    name: "John Doe",
    age: 25,
    favoriteFoods: ["Pizza", "Burger"],
  });

  person.save((err, data) => {
    if (err) return done(err);
    return done(null, data);
  });
};

// Create many People documents
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return done(err);
    return done(null, people);
  });
};

// Create find People by name documents
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, people) => {
    if (err) return done(err);
    return done(null, people);
  });
};

// Create find one Person by food documents
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, person) => {
    if (err) return done(err);
    return done(null, person);
  });
};

// Create find Person By ID documents
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    return done(null, person);
  });
};

// Create find edit then save documents 
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return done(err);

    person.favoriteFoods.push(foodToAdd);  // Add the food to the array
    person.save((err, updatedPerson) => {  // Save the updated document
      if (err) return done(err);
      return done(null, updatedPerson);
    });
  });
};

// Create find and update documents
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },      // Search by name
    { age: ageToSet },         // Update the age
    { new: true },             // Return the updated document
    (err, updatedPerson) => {  // Callback function
      if (err) return done(err);
      return done(null, updatedPerson);
    }
  );
};

// Create remove by ID documents
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) return done(err);
    return done(null, removedPerson);
  });
};

// Create remove many people documents
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.deleteMany({ name: nameToRemove }, (err, result) => {
    if (err) return done(err);
    return done(null, result);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch }) // Find people who like the specified food
    .sort({ name: 1 }) // Sort by name in ascending order
    .limit(2) // Limit results to 2 documents
    .select({ age: 0 }) // Exclude the age field from the results
    .exec((err, data) => { // Execute the query and handle the results
      if (err) return done(err);
      return done(null, data); // Pass the results to the callback
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.createManyPeople = createManyPeople;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
