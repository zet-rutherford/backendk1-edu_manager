require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var expressLayouts = require("express-ejs-layouts");
var passport = require("passport");
var session = require("express-session");
const flash = require("connect-flash");
var localPassport = require("./passport/localPassport");
var googlePassport = require("./passport/googlePassport");
var authMiddleware = require("./http/middlewares/auth.middleware");

const studentRouter = require("./routes/student/index");
const teacherRouter = require("./routes/teacher/index");
const adminRouter = require("./routes/admin/index");
const authRouter = require("./routes/auth/index");

const model = require("../src/models/index");
var app = express();

app.use(
  session({
    secret: "f8",
    resave: true,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// passport.serializeUser(function (user, done) {
//   console.log(user.id);
//   done(null, user.id);
// });

// passport.deserializeUser(async function (id, done) {
//   const user = await model.User.findByPk(id);

//   done(null, user.dataValues);
// });

passport.serializeUser(function ({ user, userSocial }, done) {
  // console.log(`serializeUser serializeUser`);
  // console.log(user?.id);
  // console.log(userSocial.id);
  // console.log(`serializeUser`);
  done(null, { id: user?.id, idSocial: userSocial?.id });
});

passport.deserializeUser(async function ({ id, idSocial }, done) {
  const user = await model.User.findByPk(id);
  const userSocial = await model.User_Social.findByPk(idSocial);
  // console.log(`deserializeUser`);

  // console.log(user.id);
  // console.log(userSocial?.id);
  done(null, { user: user?.dataValues, userSocial: userSocial?.dataValues });
});

passport.use("google", googlePassport);
passport.use("local", localPassport);

// view engine setup
app.set("views", path.join(__dirname, "resources/views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/master.layout.ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/auth", authRouter);
app.use(authMiddleware);
app.use("/student", studentRouter);
app.use("/teacher", teacherRouter);
app.use("/admin", adminRouter);

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
