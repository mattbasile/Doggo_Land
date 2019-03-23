//Notifications seed file 
const faker = require('faker');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notifications').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notifications').insert([
        {
          "admin_id": 1,
          "email": faker.internet.email(),
          "message": faker.lorem.sentences(),
          "date_sent": faker.date.recent()  
        },
        {
          "admin_id": 2,
          "email": faker.internet.email(),
          "message": faker.lorem.sentences(),
          "date_sent": faker.date.recent()     
        },
        {
          "admin_id": 3,
          "email": faker.internet.email(),
          "message": faker.lorem.sentences(),
          "date_sent": faker.date.recent()    
        }
      ]);
    });
};
