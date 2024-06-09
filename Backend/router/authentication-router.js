const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/authentication-controller");
const validate = require("../middlewares/validate-middleware");
const {
  signupSchema,
  loginSchema,
} = require("../validators/authentication-validator");
const authMiddleware = require("../middlewares/auth-middleware");

router.route("/").get(authcontrollers.home);
router
  .route("/register")
  .post(validate(signupSchema), authcontrollers.register);
router.route("/login").post(validate(loginSchema), authcontrollers.login);
router.route("/user").get(authMiddleware, authcontrollers.user);
router.route("/report").post(authcontrollers.report);
router.route("/posts").get(authcontrollers.retrieve);
router.route("/posts").post(authcontrollers.posts);
router.route("/track").get(authcontrollers.track);
module.exports = router;
