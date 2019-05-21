const db = require("../data/dbConfig.js");

module.exports = {
    add,
    find,
    findById,
    findByAdmin
  };

    // 2013-10-07 08:23:19.120

  async function add(notification) {
        const [id] = await db('notifications').insert(notification);
        return findById(id);
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