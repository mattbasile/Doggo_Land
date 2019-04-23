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
    updateDog
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
function getNotifications(id){
  return db('notifications').where({"admin_id":id})
}