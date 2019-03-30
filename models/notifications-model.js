const db = require("../data/dbConfig.js");
const Dogs = require('./dogs-model');
module.exports = {
    add,
    find,
    findByAdmin
  };

    // 2013-10-07 08:23:19.120

  async function add(notification) {
      try {
        const [id] = await db('notifications').insert(notification);
        return findById(id);
      } catch (error) {
          console.log(error)
      }
  }
  function findById(id){
    return db('notifications').where({id})
  }
  function findByAdmin(id){
    return db('notifications').where({"admin_id":id})
  }
  function find(){
    return db('notifications')
  }