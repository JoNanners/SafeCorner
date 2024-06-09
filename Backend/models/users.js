const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// //2nd way to secure the password .pre() acts like a middleware
// userSchema.pre("save", async function (next) {
//   // console.log(this) shows the document which WILL be saved
//   const user = this;
//   //if user password is already modified or not created
//   if (!user.isModified("password")) {
//     next();
//   }
//   //if password is getting created for the new user for first time
//   try {
//     const saltRound = await bcrypt.genSalt(10);
//     const hashed_password = await bcrypt.hash(user.password, saltRound);
//     user.password = hashed_password;
//   } catch (error) {
//     next(error);
//   }
// });

// READ THIS
// we use Json Web Token ie jwt here for
// 1. authentication - who is this user
// 2. authorization - what is this user allowed to do
// it has 3 parts
// 1. header - type of token and signature algorithm being used
// 2. payload - data
// 3. signature - secret key that is known only to server
// it is used to create views (like in DBMS) where we specify who is allowed to see what
// it is given by server and ALWAYS stored on client side (in cookies or local storage) and NOT in database

//this is an instance method (or pre method)
//userSchema.methods defines how many methods/functions to create (here we created generateToken function) which can be accessed by any page
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_TOKEN,
      {
        expiresIn: "5d",
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// userSchema.methods.comparePassword = async function(password){
//   return bcrypt.compare(password, this.password);
// }

//schema is created. that schema will be abstracted as a model whose name is User
const User = new mongoose.model("User", userSchema);

module.exports = User;
