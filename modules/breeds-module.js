const db = require("../data/dbConfig.js");
const Dogs = require('./dogs-module.js');
module.exports = {
    find,
    findBreeds
  };
  function find(){
      return db("breeds")
  }
  async function findBreeds(id){
        const middle = await db("dog_breeds").where({"breed_id":id})
        const dogs = await Promise.all(
            middle.map(async(dog)=>{
                const pup = await Dogs.findById(dog.dog_id)
                return pup
            })
          )
          const { name } = await db("breeds").where({id}).first()
        return {breed: name, dogs}
    } 