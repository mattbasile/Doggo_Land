const db = require("../data/dbConfig.js");
const Kennels = require('./kennels-model');
const Dogs = require('./dogs-model');
module.exports = {
    findById,
    findBy,
    add
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
