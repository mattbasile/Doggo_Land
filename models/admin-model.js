const db = require("../data/dbConfig.js");
const Kennels = require('./kennels-model');
const Dogs = require('./dogs-model');
module.exports = {
    findById,
    findBy,
    add,
    remove,
    addDog,
    getNotifications,
    updateDog,
    updateKennel,
    removeDog, 
    addBreed,
    assignBreed
  };
async function findBy(filter){
    console.log(filter)
    return await db("admins").where(filter).first()
}
async function findById(filter) {
    const id = Number(filter)
    const kennels = await db("admins").innerJoin('kennels', 'kennels.id', 'admins.kennel_id')
    const kennel = (kennels.filter(admin => admin.id === id))[0]
    const dogs = await Dogs.findByKennel(kennel.kennel_id)
    return {'admin':{...kennel, dogs}}
}
async function add(admin){
  const [id] = await db('admins').insert(admin);
  return findById(id);
}
async function remove(id){
  const admin = await findBy({id})
  console.log('kennel', admin.kennel_id)
  await Kennels.remove(admin.kennel_id)
  return await db("admins").where({id}).del()
}
async function addDog(dog){
  return await Dogs.add(dog)
}
async function updateDog(id, changes){
console.log(id, changes)
return await db('dogs').where({id}).update(changes)
  .then(count => (count > 0 ? Dogs.findById(id): null))
}
async function removeDog(id){
  return db("dogs").where({id}).del();
}
async function updateKennel(id, changes){
  console.log(id, changes)
  return await db('kennels').where({id}).update(changes)
    .then(count => (count > 0 ? Kennels.findById(id): null))
  }
function getNotifications(id){
  return db('notifications').where({"admin_id":id})
}
function findBreedById(id){
  return db("breeds").where({id})
}
async function addBreed(breed, dog_ID){
  console.log(dog_ID)
  const [id] = await db("breeds").insert(breed)
  await db("dog_breeds").insert({"dog_id": dog_ID, "breed_id": id})
  return await Dogs.findById(dog_ID)
}
async function assignBreed(dogID, breedID){
  const [id] = await db("dog_breeds").insert({"dog_id": dogID, "breed_id": breedID})
  return id
}