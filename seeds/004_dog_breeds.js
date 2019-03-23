//Dog_Breeds seed file 
const faker = require('faker');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('dog_breeds').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('dog_breeds').insert([
        {
         "breed_id": faker.random.number({'min': 1, 'max': 5}),
         "dog_id": 1,
        },
        {
         "breed_id": faker.random.number({'min': 1, 'max': 5}),
         "dog_id": 2,
        },
        {
         "breed_id": faker.random.number({'min': 1, 'max': 5}),
         "dog_id": 3,
        },
        {
         "breed_id": faker.random.number({'min': 1, 'max': 5}),
         "dog_id": 4,
        },
        {
         "breed_id": faker.random.number({'min': 1, 'max': 5}),
         "dog_id": 5,
        },
         {
         "breed_id": faker.random.number({'min': 1, 'max': 5}),
         "dog_id": 5,
        }
      ]);
    });
};
