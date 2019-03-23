//Admin seed file 
const faker = require('faker');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('admins').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('admins').insert([
       {
       "kennel_id": 1,
       "username": faker.internet.userName(),
       "password": faker.internet.password(),
       },
       {
       "kennel_id": 2,
       "username": faker.internet.userName(),
       "password": faker.internet.password(),
       },
       {
       "kennel_id": 3,
       "username": faker.internet.userName(),
       "password": faker.internet.password(),
       }
      ]);
    });
};
