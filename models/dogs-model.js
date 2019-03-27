const db = require("../data/dbConfig.js");

module.exports = {
    find,
    findById,
    add,
    update,
    remove
  };
  async function find() {
    const dogs = await db("dogs")
    const breedsAndDog = await Promise.all(dogs.map(dog => findById(dog.id)))
    return {breedsAndDog};
  }
  async function findById(id) {
    const dog = await db("dogs").where({id});
    const breedID = await db("dog_breeds").where({"dog_id": id})
    const breeds = await Promise.all(breedID.map(breed => db("breeds").where({"id":breed.id})))
    return {dog, breeds}
  }
  async function findBreed(id){
      return db("breeds").where({id}) 
  }

  async function add(kennel){
    const [id] = await db('kennels').insert(kennel);
    return findById(id);
  }
  async function update(id, changes){
      console.log(id, changes)
  return await db('kennels')
    .where({id})
    .update({changes})
    .then(count => (count > 0 ? findById(id): null))
  }
  function remove(id){
      return db("kennels").where(id).del();
  }