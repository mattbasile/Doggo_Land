//Dogs seed file 
const faker = require('faker');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('dogs').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('dogs').insert([
        {
          "kennel_id": faker.random.number({'min': 1, 'max': 3}) ,
          "bio": faker.lorem.paragraph(),
          "age": faker.random.number({'min': 1, 'max': 20}) ,
          "size": 'small',
          "male": faker.random.boolean() ,
          "price": faker.random.number({'min': 0, 'max': 200}),
          "img_url": faker.image.animals(), 
          "name": faker.name.firstName()
        },
        {
          "kennel_id": faker.random.number({'min': 1, 'max': 3}) ,
          "bio": faker.lorem.paragraph(),
          "age": faker.random.number({'min': 1, 'max': 20}) ,
          "size": 'medium',
          "male": faker.random.boolean() ,
          "price": faker.random.number({'min': 0, 'max': 200}),
          "img_url": faker.image.animals(), 
          "name": faker.name.firstName()
        },
        {
          "kennel_id": faker.random.number({'min': 1, 'max': 3}) ,
          "bio": faker.lorem.paragraph(),
          "age": faker.random.number({'min': 1, 'max': 20}) ,
          "size": 'large',
          "male": faker.random.boolean() ,
          "price": faker.random.number({'min': 0, 'max': 200}),
          "img_url": faker.image.animals(), 
          "name": faker.name.firstName()
        },
        {
          "kennel_id": faker.random.number({'min': 1, 'max': 3}) ,
          "bio": faker.lorem.paragraph(),
          "age": faker.random.number({'min': 1, 'max': 20}) ,
          "size": 'small',
          "male": faker.random.boolean() ,
          "price": faker.random.number({'min': 0, 'max': 200}),
          "img_url": faker.image.animals(), 
          "name": faker.name.firstName()
        },
        {
          "kennel_id": faker.random.number({'min': 1, 'max': 3}) ,
          "bio": faker.lorem.paragraph(),
          "age": faker.random.number({'min': 1, 'max': 20}) ,
          "size": 'large',
          "male": faker.random.boolean() ,
          "price": faker.random.number({'min': 0, 'max': 200}),
          "img_url": faker.image.animals(), 
          "name": faker.name.firstName()
        }
      ]);
    });
}; 
