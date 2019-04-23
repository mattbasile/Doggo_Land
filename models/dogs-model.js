const db = require("../data/dbConfig.js");

module.exports = {
    find,
    findById,
    findByKennel,
    add,
    update,
    remove
  };
  async function find() {
    const dogs = await db("dogs")
    var fullDogs =[]
    for(i=0; i<dogs.length; i++){
      // console.log(dogs[i].id)
      const dog = await findById(dogs[i].id)
      fullDogs.push(dog)
    }
    return fullDogs;
  }
  async function findById(id) {
    const dog = await db("dogs").where({id}).first();
    // console.log(dog)
    const breedID = await db("dog_breeds").innerJoin('dogs', 'dogs.id', 'dog_breeds.dog_id').where({"dog_id": dog.id})
    console.log(breedID)
    const breeds = await Promise.all(
      breedID.map(async(breed)=>{
        try {
          const name = await findBreed(breed.breed_id)
          return name[0].name
        } catch (error) {
          console.log(error)
        }
      })
    )
    return {dog:{...dog, breeds}}
  }
  function findBreed(id){
      return db("breeds").where({id})
  }
  async function findByKennel(kennel_id){
    const dogs = await db("dogs").where({kennel_id});;
    var full =[]
    for(i=0; i<dogs.length; i++){
      console.log(dogs[i].id)
      const dog = await findById(dogs[i].id)
      console.log(dog)
      full.push(dog)
    }
    console.log(full, "DOGS")

    return full
    
  }
  async function add(dog){
      try {
          const id = dog.kennel_id
          const kennel = await db("kennels").where({id}).first();
          const [id] = await db('dogs').insert(dog);
          return findById(id);
      } 
    catch (error) {
        console.log(error)
          throw new Error('That Kennel does not exist')
      }
  }
  async function update(id, changes){
  console.log(id, changes)
  return await db('dogs')
    .where({id})
    .update({changes})
    .then(count => (count > 0 ? findById(id): null))
  }
  function remove(id){
      return db("kennels").where(id).del();
  }