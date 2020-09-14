exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("category")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("category").insert([
        { id: 1, name: "Frontend" },
        { id: 2, name: "Backend" },
        { id: 3, name: "Fullstack" },
      ]);
    });
};
