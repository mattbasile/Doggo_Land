//Notifications seed file 
const faker = require('faker');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notifications').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notifications').insert([
        {
          "kennel_id": 1,
          "dog_id": 1,
          "email": faker.internet.email(),
          "message": faker.lorem.sentences(),
          "name": faker.name.findName(),
          "date_sent": faker.date.recent()  
        },
        {
          "kennel_id": 2,
          "dog_id": 2,
          "email": faker.internet.email(),
          "message": faker.lorem.sentences(),
          "name": faker.name.findName(),
          "date_sent": faker.date.recent()     
        },
        {
          "kennel_id": 3,
          "dog_id": 2,
          "email": faker.internet.email(),
          "message": faker.lorem.sentences(),
          "name": faker.name.findName(),
          "date_sent": faker.date.recent()    
        }
      ]);
    });
};
