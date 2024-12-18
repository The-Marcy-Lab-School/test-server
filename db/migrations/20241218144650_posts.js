exports.up = function (knex) {
  return knex.schema
    .createTable('posts', function (table) {
      table.increments('id').primary();
      table.string('content').notNullable();
      table.string('username').notNullable();

      // optional columns
      table.string('img_url');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable('posts');
};