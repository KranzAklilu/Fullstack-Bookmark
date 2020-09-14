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
      return knex("bookmark").insert(bookmark);
    },
    getById: function (id) {
      return knex("bookmark").where("id", id);
    },
    getAll: function () {
      return knex("bookmarks").returning("*");
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
      return knex("category").insert(category);
    },
    getOne: function (id) {
      return knex("category").where("id", id);
    },
    getAll: function () {
      return knex("category").returning("*");
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
