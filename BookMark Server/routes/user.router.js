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
    value: req.body.name,
    link: req.body.link,
    user_id: req.body.user_id,
    category_id: req.body.category_id,
  };
  queries.bookmark
    .create(bookmark)
    .then((bookmark) => res.json(bookmark))
    .catch((err) => console.log(err));
});
router.post("/load-categories", (req, res) => {
  const categoryUserId = req.body.user_id;
  queries.category
    .getOneByUserId(categoryUserId)
    .then((category) => res.json(category))
    .catch((err) => console.log(err));
});
router.post("/create-category", (req, res) => {
  const category = {
    value: req.body.name,
    user_id: req.body.user_id,
  };
  queries.category
    .create(category)
    .then((category) => res.json(category))
    .catch((err) => console.log(err));
});
router.get("/innerjoin/:id", (req, res) => {
  queries.bookmark
    .innerJoinCategory(req.params.id)
    .then((name) => res.json(name))
    .catch((err) => console.log(err));
});

module.exports = router;
