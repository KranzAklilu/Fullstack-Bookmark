const express = require("express");
const router = express.Router();
const passport = require("passport");
const cors = require("cors");
const queries = require("../db/queries");
const utils = require("../lib/utils");
const initialize = require("../config/passport-config");
const {
  checkIfAuthenticated,
  checkIfNotAuthenticated,
} = require("../middleware/checkAuthentication");
const { json } = require("express");
const knex = require("../db/knex");

const getUserByEmail = (email) => queries.user.getByEmail(email);
const getUserById = (id) => queries.user.getById(id);

initialize(passport, getUserByEmail, getUserById);

router.get("/", (req, res) => {
  queries.user.getAll().then(function () {
    knex
      .select()
      .from("user")
      .then((user) => res.json(user))
      .catch((err) => console.log(err));
  });
});

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      success: true,
      msg: "You Are Authorized",
    });
  }
);
router.post(
  "/login",
  passport.authenticate("local", {
    session: false,
    // successRedirect: "/login",
    // failureRedirect: "/register",
  }),
  (req, res) => {
    const isValid = utils.validPassword(
      req.body.password,
      req.user.hash,
      req.user.salt
    );
    if (isValid) {
      console.log(req.user);
      const tokenObject = utils.issueJWT(req.user);
      res.status(200).json({
        success: true,
        token: tokenObject.token,
        expiresIn: tokenObject.expires,
      });
    } else {
      console.log("WTF");
    }
  }
);

router.post("/register", async (req, res) => {
  const saltHash = utils.genPassword(req.body.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;
  try {
    queries.user
      .create({
        email: req.body.email,
        salt,
        hash,
      })
      .then((user) => {
        res.json(user);
      })
      // .then(function () {
      //   knex
      //     .select()
      //     .from("user")
      //     .then((user) => res.json(user))
      //     .catch((err) => console.log(err));
      // })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;