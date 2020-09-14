exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("user")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("user").insert([
        {
          id: 1,
          email: "black@gmail.com",
          salt: "black1234",
          hash: "aksjldlk",
        },
        {
          id: 2,
          email: "white@gmail.com",
          salt: "white0098",
          hash: "aksjldlk",
        },
        {
          id: 3,
          email: "blue@gmail.com",
          salt: "blue0120",
          hash: "asdasdsasda",
        },
      ]);
    });
};
