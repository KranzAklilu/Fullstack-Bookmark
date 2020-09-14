const LocalStrategy = require("passport-local").Strategy;
const jwtPassport = require("passport-jwt");
const JwtStrategy = jwtPassport.Strategy;
const { ExtractJwt } = jwtPassport;
const utils = require("../lib/utils");
const path = require("path");
const fs = require("fs");

const pubKeyPath = path.join(__dirname, "../crypto", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pubKeyPath, "utf8");

const initialize = function (passport, getUserByEmail, getUserById) {
  const localOptions = {
    usernameField: "email",
  };
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ["RS256"],
  };
  const authenticateUser = async function (email, password, done) {
    const user = await getUserByEmail(email).then((user) => user[0]);
    if (user == null) {
      return done(null, false, { message: "Email Not Found" });
    }
    try {
      if (utils.validPassword(password, user.hash, user.salt)) {
        return done(null, user);
      } else {
        console.log("Not-Valid");
        return done(null, false, { message: "Password Not Correct" });
      }
    } catch (err) {
      return done(err);
    }
  };
  const jwtConfig = async function (payload, done) {
    console.log(payload);
    await getUserById(payload.sub)
      .then((user) => {
        console.log(user);
        if (user[0]) {
          done(null, user[0]);
        } else {
          console.log("user[0]");
          done(null, false);
        }
      })
      .catch((err) => done(err));

    console.log(user);
  };

  passport.use(new LocalStrategy(localOptions, authenticateUser));
  passport.use("jwt", new JwtStrategy(jwtOptions, jwtConfig));

  // passport.serializeUser((user, done) => done(null, user.id));
  // passport.deserializeUser(async (id, done) =>
  //   done(null, await getUserById(id).then((id) => id))
  // );
};

module.exports = initialize;
