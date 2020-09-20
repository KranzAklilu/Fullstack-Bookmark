const express = require("express");
const queries = require("../db/queries");
const router = express.Router();

router.post("/create", (req, res) => {
  const category = {
    id: req.body.id,
    name: req.body.name,
  };
  queries.category.create(category).then(function () {
    queries.category
      .getAll()
      .then((category) => res.json(category))
      .catch((err) => console.log(err));
  });
});
router.get("/innerjoin/:id", (req, res) => {
  queries.bookmark
    .innerJoinCategory(req.params.id)
    .then((name) => res.json(name))
    .catch((err) => console.log(err));
});

module.exports = router;
