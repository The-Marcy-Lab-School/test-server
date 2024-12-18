/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  // Before you have models you can always just do `await knex('table_name').del`
  await knex('posts').del();

  await knex.raw('ALTER SEQUENCE posts_id_seq RESTART WITH 1');

  await knex('posts').insert([
    { content: 'Hello World!', username: 'Ben' },
    { content: 'Love + Push = Marcy', username: 'Gonzalo' },
    { content: 'Dogs > Cats', username: 'Christie', img_url: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg' }
  ]);
};