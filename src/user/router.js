const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");
const User = require("./model");
const bcrypt = require("bcrypt");
const router = new Router();

router.post("sign-up", (req, res, next) => {
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
        if (entity) {
          res.status(403).send({
            message: "User with this name already exists"
          });
        } else {
          const user = {
            userName: req.body.userName,
            userPassword: bcrypt.hashSync(req.body.userPassword, 10)
          };
          User.create(user)
            .then(user =>
              res.send({
                jwt: toJWT({ userId: user.id }),
                userName: user.userName
              })
            )
            .catch(error => next(error));
        }
      })
      .catch(error => {
        console.error(error);
        res.status(500).send({
          message: "Something went wrong"
        });
      });
  }
});

module.exports = router;
