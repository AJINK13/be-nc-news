
exports.up = function(knex) {

    // The `up` function should contain all the commands we need in order to update the database - this could be creating or updating a table.

    return knex.schema.createTable('topics', topicsTable => {
        topicsTable.string('slug').primary().notNullable()
        topicsTable.string('description').notNullable()
    })
};

exports.down = function(knex) {

    // The `down` function does the opposite of the `up` function. 
    // For example, if `up` creates a particular table then `down` must use commands to drop the same table. 
    // The `down` function allows us to quickly undo a migration if need be.
    
    return knex.schema.dropTable('topics')
};
