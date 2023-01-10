var cookieParser = require("cookie-parser");
var csrf = require("csurf");
var bodyParser = require("body-parser");
var express = require("express");
var cors = require("cors");
const mysql = require("mysql2");
const app = express();

const db = mysql.createConnection({
  user: "root",
  port: 3306,
  host: "localhost",
  password: "WearWolfLaBete@002",
  database: "loginsystem",
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.post("/register", (req, res) => {
  const username = req.body.username;
  const number = req.body.number;
  const email = req.body.email;
  db.execute(
    "INSERT INTO users (username, number, email) VALUES (?,?)",
    [username, number, email],
    (err, result) => {
      console.log(err);
    }
  );
});

app.use(express.json());
app.listen(3001, () => {
  console.log("running server");
});

// setup route middlewares
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });

const corsOptions = {
  origin: "http://localhost:3001",
  credentials: true,
};

app.use(cors(corsOptions));

// parse cookies
// we need this because "cookie" is true in csrfProtection
app.use(cookieParser());

app.get("/form", csrfProtection, function (req, res) {
  // pass the csrfToken to the view
  // res.render('send', { csrfToken: req.csrfToken() })
  res.send({ csrfToken: req.csrfToken() });
});

app.post("/process", parseForm, csrfProtection, function (req, res) {
  res.send("data is being processed");
});

module.exports = app;
