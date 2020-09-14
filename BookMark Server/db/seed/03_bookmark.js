exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("bookmark")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("bookmark").insert([
        {
          id: 1,
          name: "NodeJS",
          link: "nodejs.org",
          user_id: "1",
          category_id: "2",
        },
        {
          id: 2,
          name: "Postgresql",
          link: "postgresql.org",
          user_id: "3",
          category_id: "3",
        },
        {
          id: 3,
          name: "ReactJS",
          link: "ReactJS.com",
          user_id: "2",
          category_id: "1",
        },
      ]);
    });
};
