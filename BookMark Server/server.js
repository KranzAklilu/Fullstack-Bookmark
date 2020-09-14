const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
const router = require("./routes/router");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const corsOptions = {
  origin: "https://localhost:1234",
  optionsSuccessStatus: 200,
};

app.use(cors());

app.use(passport.initialize());

app.use(router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App Is listening At PORT ${PORT}`));
