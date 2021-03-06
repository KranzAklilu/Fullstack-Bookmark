const knex = require("./knex");

module.exports = {
  user: {
    getAll: function () {
      return knex("user");
    },
    getById: function (id) {
      return knex("user").where("id", id);
    },
    getByEmail: function (email) {
      return knex("user").where("email", email);
    },
    create: function (user) {
      return knex("user")
        .insert({
          email: user.email,
          salt: user.salt,
          hash: user.hash,
        })
        .returning("*");
    },
    delete: function (id) {
      return knex("user").where("id", id).del();
    },
  },
  bookmark: {
    create: function (bookmark) {
      return knex("bookmark").insert(bookmark).returning("*");
    },
    getById: function (id) {
      return knex("bookmark").where("id", id);
    },
    getAll: function () {
      return knex("bookmark").returning("*");
    },
    innerJoinUser: function (user_id) {
      return knex("bookmark")
        .select("user.id")
        .innerJoin("user", "bookmark.user_id", Number(user_id))
        .where("user.id", user_id);
    },
    innerJoinCategory: function (category_id) {
      return knex("bookmark")
        .select("category.name")
        .innerJoin("category", "bookmark.category_id", Number(category_id))
        .where("category.id", category_id);
    },
    update: function (id, updated) {
      return knex("bookmark").where("id", id).update({
        title: updated.title,
        link: updated.link,
      });
    },
    delete: function (id) {
      return knex("bookmark").where("id", id).del();
    },
  },
  category: {
    create: function (category) {
      return knex("category").insert(category).returning("*");
    },
    getOne: function (id) {
      return knex("category").where("id", id);
    },
    getAll: function () {
      return knex("category").returning("*");
    },
    getOneByUserId: function (id) {
      return knex("category").where("user_id", id).returning("*");
    },
    update: function (id, updated) {
      return knex("category").where("id", id).update({
        title: updated.title,
        link: updated.link,
      });
    },
    delete: function (id) {
      return knex("category").where("id", id).del();
    },
  },
};
