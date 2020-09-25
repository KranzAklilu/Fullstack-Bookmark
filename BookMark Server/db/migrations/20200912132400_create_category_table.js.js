exports.up = function (knex) {
  return knex.schema.createTable("category", function (table) {
    table.increments();
    table.string("value").notNullable();
    table.integer("user_id").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("category");
};
