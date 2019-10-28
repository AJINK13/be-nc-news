
exports.up = function(knex) {

    return knex.schema.createTable('comments', commentsTable => {
        commentsTable.increments('comment_id').primary()
        commentsTable.string('author').reference('users.username')
        commentsTable.string('article_id').reference('articles.article_id')
        commentsTable.integer('votes').defaultTo(0).notNullable()
        commentsTable.timestamp('created_at').defaultTo(knex.fn.now())
        commentsTable.string('body').notNullable()
    })
};

exports.down = function(knex) {

    return knex.scheme.dropTable('comments')
  
};
