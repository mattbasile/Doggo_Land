const db = require("../data/dbConfig.js");
const Kennels = require('./kennels-module.js');
const Dogs = require('./dogs-module.js');
const bcrypt = require('bcryptjs');

module.exports = {
    findById,
    findBy,
    add,
    remove,
    addDog,
    getNotifications,
    updateAdmin,
    updateDog,
    updateKennel,
    removeDog, 
    addBreed,
    assignBreed,
    removeBreed
  };
async function findBy(filter){
    return await db("admins").where(filter).first()
}
async function findById(filter) {
    const id = Number(filter)
    const [admin] = await db("admins").where({id})
    const [kennel] = await db("kennels").where({"id": admin.kennel_id})
    const dogs = await Dogs.findByKennel(kennel.id) 
    return {...admin,...kennel, dogs}
}
async function add(admin){
  console.log(admin)
  const [id] = await db('admins').insert(admin);
  console.log(id)
  return findById(id);
}
async function remove(id){
  const admin = await findBy({id})
  await Kennels.remove(admin.kennel_id)
  const dogs = await Dogs.findByKennel(admin.kennel_id)
  dogs.forEach(dog =>{
    removeDog(dog.id)
  })
  return await db("admins").where({id}).del()
}
async function addDog(dog){
  return await Dogs.add(dog)
}
async function updateAdmin(id, changes){
  if(changes.password){
    const hash = bcrypt.hashSync(changes.password, 12); // 2 ^ n
    changes.password = hash;
  } 
  return await db('admins').where({id}).update(changes)
    .then(count => (count > 0 ? findById(id): null))
}

async function updateDog(id, changes){
return await db('dogs').where({id}).update(changes)
  .then(count => (count > 0 ? Dogs.findById(id): null))
}
async function removeDog(id){
  return db("dogs").where({id}).del();
}
async function updateKennel(id, changes){
  return await db('kennels').where({id}).update(changes)
    .then(count => (count > 0 ? Kennels.findById(id): null))
}

function getNotifications(id){
  return db('notifications').where({"kennel_id":id})
}

async function addBreed(name){
  const [id] = await db("breeds").insert(name);
  return await db("breeds").where({id});
  // await db("dog_breeds").insert({"dog_id": dog_ID, "breed_id": id})
  // return await Dogs.findById(dog_ID)
}
async function assignBreed(dogID, breedID){
  const response = await db("dog_breeds").insert({"dog_id": dogID, "breed_id": breedID})
  if(response > 0){
    return await Dogs.findById(dogID)
  }
  else{
    throw new Error('Breed or Dog does not exist')
  }
}
async function removeBreed(dog_id, breed_id){
  console.log(dog_id, breed_id)
  const response = await db("dog_breeds").where({'dog_id': dog_id, 'breed_id':breed_id}).first().del();
  console.log(response)
  if(response > 0){
    return await Dogs.findById(dog_id)
  }
  else{
    throw new Error('Breed or Dog does not exist')
  }
}