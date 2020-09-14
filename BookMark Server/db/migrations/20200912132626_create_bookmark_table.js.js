exports.up = function (knex) {
  return knex.schema.createTable("bookmark", function (table) {
    table.increments();
    table.string("name").notNullable();
    table.string("link").notNullable();
    table.integer("user_id").notNullable().references("id").inTable("user");
    table
      .integer("category_id")
      .notNullable()
      .references("id")
      .inTable("category");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("bookmark");
};
