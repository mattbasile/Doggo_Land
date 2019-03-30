exports.up = function(knex, Promise) {
    return knex.schema.createTable('notifications', function(tbl){   
        tbl.increments('id').primary();    
        tbl.integer('admin_id').unsigned().notNullable().references('id').inTable('admins');
        tbl.integer('dog_id').unsigned().notNullable().references('id').inTable('dogs');
        tbl.string("email", 255).notNullable();
        tbl.string("name", 500);
        tbl.string("message", 500);
        tbl.date("date_sent");
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notifications');
};