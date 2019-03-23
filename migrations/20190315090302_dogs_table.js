exports.up = function(knex, Promise) {
    return knex.schema.createTable('dogs', function(tbl){   
        tbl.increments('id').primary();    
        tbl.integer('kennel_id').unsigned().notNullable().references('id').inTable('kennels') 
        tbl.string("bio", 500);
        tbl.integer("Age");    
        tbl.string("Size", 100);   
        tbl.boolean("male");  
        tbl.integer("Price"); 
        tbl.string("img_url", 255);  
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('dogs');
};