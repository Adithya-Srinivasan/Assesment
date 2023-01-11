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
  database: "users",
  // nestTables: "usersdata",
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.post("/register", (req, res) => {
  const name = req.body.name;
  const number = req.body.number;
  const email = req.body.email;
  db.query(
    "INSERT INTO users (name, number, email) VALUES (?,?,?)",
    [name, number, email],
    (err, result) => {
      console.log(err);
    }
  );
});

app.use(express.json());
app.listen(3001, () => {
  console.log("running server");
});

var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });

const corsOptions = {
  origin: "http://localhost:3001",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());

app.get("/register", csrfProtection, function (req, res) {
  res.send({ csrfToken: req.csrfToken() });
});

app.post("/register", parseForm, csrfProtection, function (req, res) {
  res.send("data is being processed");
});

module.exports = app;
