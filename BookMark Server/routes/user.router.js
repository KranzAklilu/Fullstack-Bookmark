const express = require("express");
const router = express.Router();
const queries = require("../db/queries");
const passport = require("passport");

router.get(
  "/getUser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

router.get("/", (req, res) => {
  queries.bookmark
    .getAll()
    .then((buk) => req.json(buk))
    .catch((err) => console.log(err));
  queries.category
    .getAll()
    .then((cat) => res.json(cat))
    .catch((err) => console.log(err));
});
router.post("/create-bookmark", (req, res) => {
  const bookmark = {
    name: req.body.name,
    link: req.body.link,
    user_id: req.body.user_id,
    category_id: req.body.category_id,
  };
  queries.bookmark
    .create(bookmark)
    .then(function () {
      queries.category
        .getAll()
        .then((bookmark) => res.json(bookmark))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});
router.post("/create-category", (req, res) => {
  const category = {
    name: req.body.name,
  };
  queries.category.create(category).then((category) => res.json(category));
});
router.get("/innerjoin/:id", (req, res) => {
  queries.bookmark
    .innerJoinCategory(req.params.id)
    .then((name) => res.json(name))
    .catch((err) => console.log(err));
});

module.exports = router;
