exports.up = function(knex, Promise) {
    return knex.schema.createTable('breeds', function(tbl){   
        tbl.increments('id').primary();    
        tbl.string("name", 255).notNullable();
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('breeds');
};