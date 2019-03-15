
exports.up = function(knex, Promise) {
    return knex.schema.createTable('kennels', function(tbl){   
        tbl.increments('id').primary();    
        tbl.string("name",  255).notNullable().unique();    
        tbl.string("bio", 500);
        tbl.string("location", 500);    
        tbl.string("email", 255);   
        tbl.string("phone", 255);  
        tbl.string("img_url", 255);  
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('kennels');
};
