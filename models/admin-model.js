const db = require("../data/dbConfig.js");
const Kennels = require('./kennels-model');
const Dogs = require('./dogs-model');
module.exports = {
    findById,
    add
  };
  async function findBy(filter){
      const admin = await db("admins").where({filter})
      return await findById(admin.id)
  }


  async function findById(filter) {
      const id = Number(filter)
      console.log('findby',id)
      const kennels = await db("admins").innerJoin('kennels', 'kennels.id', 'admins.kennel_id')
      console.log(kennels)
      const kennel = (kennels.filter(admin => admin.id === id))[0]
      console.log(kennel)
      const dogs = await Dogs.findByKennel(kennel.kennel_id)
      return {'admin':{...kennel, dogs}}
  }

  async function add(admin){
    const [id] = await db('admins').insert(admin);
    console.log('add',id)
    return findById(id);
  }
