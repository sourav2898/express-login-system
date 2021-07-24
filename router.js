const express = require("express");
const { builtinModules } = require("module");
const router = express.Router();

const credential = {
  email: "admin@gmail.com",
  password: "admin123",
};

// login user
router.post("/login", (req, res) => {
  if (
    req.body.email == credential.email &&
    req.body.password == credential.password
  ) {
    req.session.user = credential.email;
    res.redirect("/route/dashboard");
    // res.end("login successfull");
  } else {
    res.end("Invalid User");
  }
});

router.get("/dashboard", (req, res) => {
  if (req.session.user) {
    res.render("dashboard", {
      title: "Login Successfull",
      user: req.session.user,
    });
  } else {
    res.send("Unauthorised user");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      res.render("base", {
        title: "Login System",
        logout: "logout successfull",
      });
    }
  });
});

module.exports = router;
