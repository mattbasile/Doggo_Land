const db = require("../data/dbConfig.js");

module.exports = {
    find,
    findById,
    add,
    update,
    remove
  };
  async function find() {
    const kennels = await db("kennels")
    // const fullKennel = await Promise.all(kennels.map(kennel => findById(kennel.id)))
    var fullKennel =[]
    for(i=0; i<kennels.length; i++){
      // console.log(dogs[i].id)
      const full = await findById(kennels[i].id)
      fullKennel.push(full)
    }
    return fullKennel;
  }
  async function findById(id) {
    const kennel = await db("kennels").where({id});
    const dogs = await db("dogs").where({"kennel_id": id})
    return {kennel, dogs}
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