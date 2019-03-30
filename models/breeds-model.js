const db = require("../data/dbConfig.js");
const Dogs = require('./dogs-model');
module.exports = {
    find,
    findBreeds
  };

  function find(){
      return db("breeds")
  }

  async function findBreeds(id){
    try {
        const middle = await db("dog_breeds").where({"breed_id":id})
        return await Promise.all(
            middle.map(async(dog)=>{
              try {
                const pup = await Dogs.findById(dog.dog_id)
                return pup
              } catch (error) {
                console.log(error)
              }
            })
          )



    } catch (error) {
        console.log(error)
    }
    
  }