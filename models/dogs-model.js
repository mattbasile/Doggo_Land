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
    const breedID = await db("dog_breeds").where({"dog_id": dog.id})
    // console.log(breedID)
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
    
    
    console.log(breeds)
    // for (i = 0; i < breedID.length; i++) { 
    //   const test = await findBreed(breedID[i].breed_id)
    //   console.log(test)
    //   breeds.push(test[i].name)
    // }
    
    return {dog, breeds}
  }
  function findBreed(id){
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