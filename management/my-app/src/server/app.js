var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { v4: uuidv4 } = require("uuid");
const User = require("./database/model");

const connectToMongoose = require("./database/connect");
connectToMongoose();

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

let users = [
  { email: "123@gmail.com", password: "123456" },
  { email: "wahaha@qq.com", password: "wahaha" },
  { email: "julie123@gmail.com", password: "http123" },
];
app.get("/logout", async (_, res) => {
  const usersFromDataBase = await User.find({});
  const userList = usersFromDataBase.map(({ email, password, id }) => {
    return {
      email,
      password,
      id,
    };
  });
  res.json(userList);
});

app.post("/addUser", async (req, res) => {
  if (req.body && req.body.email && req.body.password) {
    const { email, password } = req.body;
    let existUser = await User.exists({ email });
    if (existUser) {
      res.status(406).json({
        error: "Not Acceptable",
        message: "User already exist",
      });
      return;
    }
    const newUser = new User({
      email,
      password,
      id: uuidv4(),
    });
    const retValue = await newUser.save();
    if (newUser == retValue) {
      res.status(201).json({
        message: "user registered",
        status: 201,
        newUser: {
          email: newUser.email,
          password: newUser.password,
          id: newUser.id,
        },
      });
    }
    return;
  }
  res.status(404).json({
    error: "failed",
    message: "input faild",
  });
});

app.post("/login", async (req, res) => {
  if (req.body && req.body.email && req.body.password) {
    const { email, password } = req.body;
    const queryResult = await User.findOne({ email });
    if (queryResult) {
      if (queryResult.password == password) {
        res.status(200).json({
          message: "user logged in",
          status: 200,
        });
      } else {
        res.status(401).json({
          error: "Unauthorized",
          message: "incorrect password",
        });
      }
      return;
    }
    res.status(404).json({
      error: "failed",
      message: "no such user, please sign up",
    });
    return;
  }
  res.status(404).json({
    error: "failed",
    message: "input faild",
  });
});
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
