exports.up = function (knex) {
  return knex.schema.createTable("user", function (table) {
    table.increments();
    table.string("email").notNullable().unique();
    table.string("salt").notNullable();
    table.string("hash").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("user");
};
