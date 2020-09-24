const express = require("express");
const router = express.Router();
const passport = require("passport");
const queries = require("../db/queries");
const utils = require("../lib/utils");
const initialize = require("../config/passport-config");
const getUserByEmail = (email) => queries.user.getByEmail(email);
const getUserById = (id) => queries.user.getById(id);

initialize(passport, getUserByEmail, getUserById);

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
  }),
  (req, res) => {
    const isValid = utils.validPassword(
      req.body.password,
      req.user.hash,
      req.user.salt
    );
    if (isValid) {
      const tokenObject = utils.issueJWT(req.user);
      res.status(200).json({
        success: true,
        email: req.user.email,
        _id: req.user.id,
        token: tokenObject.token,
        expiresIn: tokenObject.expires,
      });
    } else {
      req.sendStatus(402).json({ msg: "Incorrect Email or Password" });
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
        res.json({ msg: "Successfully Registered", user });
      })
      .catch((err) =>
        res.status(400).json({ msg: "We know Someone With this Username", err })
      );
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
