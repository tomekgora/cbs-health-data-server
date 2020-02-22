const { Router } = require("express");
const { toJWT, toData } = require("./jwt");
const router = new Router();
const bcrypt = require("bcrypt");
const User = require("../user/model");
const auth = require("./middleware");

router.post("/login", (req, res, next) => {
  const userName = req.body.userName;
  const userPassword = req.body.userPassword;

  if (!userName || !userPassword) {
    res.status(400).send({
      message: "Please supply a valid username and password"
    });
  } else {
    User.findOne({
      where: {
        userName: req.body.userName
      }
    })
      .then(entity => {
        if (!entity) {
          res.status(400).send({
            message: "User with that username does not exist"
          });
        } else if (
          bcrypt.compareSync(req.body.userPassword, entity.userPassword)
        ) {
          res.send({
            jwt: toJWT({ userId: entity.id }),
            userName: req.body.userName
          });
        } else {
          res.status(400).send({
            message: "Password was incorrect"
          });
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send({
          message: "Something went wrong"
        });
      });
  }
});

// Remove this, was only used to test if auth worked
router.get("/secret-endpoint", auth, (req, res) => {
  res.send({
    message: `Thanks for visiting the secret endpoint ${req.user.userName}.`
  });
});

module.exports = router;
