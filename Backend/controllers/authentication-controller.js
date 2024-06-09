const User = require("../models/users");
const Report = require("../models/reports");
const bcrypt = require("bcryptjs");
const Post = require("../models/posts");
const mongoose = require("mongoose");
//home page
const home = async (req, res) => {
  try {
    res
      .status(200)
      .json({ message: "this is /home using a controller linking to router" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// *------------------------------------------
// *                Register
// *------------------------------------------
const register = async (req, res) => {
  try {
    // res.send("you are in register page");
    console.log(req.body);
    // implement the user ka schema here to take what is required

    // 1. get registration data using req.body
    const { username, email, phone, password } = req.body;

    // 2. check if phone exists {email:email} 1st email is field. 2nd email is value taken from req.body
    const userExists = await User.findOne({ email: email }); //need to use await whenever using findOne method
    // else it will be hard to handle promise

    if (userExists) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // 3. hash password (use bcrypt.js)
    const saltRound = 10;
    const hashed_password = await bcrypt.hash(password, saltRound);

    // 4. create new user with hashed password
    const userCreated = await User.create({
      username,
      email,
      phone,
      password: hashed_password,
    });

    // 5. save user to database

    // 6. send response with success message
    res.status(201).json({
      // message: userCreated,
      message: "Registration Successful",
      // we call userCreated.generateToken()
      token: await userCreated.generateToken(),
      //JWT needs a string. this makes sure its always an string
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// *------------------------------------------
// *                Login
// *------------------------------------------

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if email is registered or not
    const userExist = await User.findOne({ email: email });
    console.log(userExist);

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credential" });
    }

    // if user exists, compare password
    const valid_password = await bcrypt.compare(password, userExist.password);
    // another way to compare password
    // const valid_password = await userExist.comparePassword(password);

    if (valid_password) {
      res.status(201).json({
        message: "Login Successful",
        // we call userCreated.generateToken()
        token: await userExist.generateToken(),
        //JWT needs a string. this makes sure its always an string
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid Email or Password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("internal server error");
  }
};

// *------------------------------------------
// *                User Data
// *------------------------------------------

const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    res.status(201).json({
      message: userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// *------------------------------------------
// *                Report Incident
// *------------------------------------------

const report = async (req, res) => {
  try {
    const { lat, lng, description } = req.body;
    // console.log(req.body);
    // console.log(lat, lng, description);
    const incident = new Report({ lat, lng, description });
    // console.log(incident);
    await incident.save();
    res.status(201).json({ message: "Incident reported successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to report incident" });
  }
};

// *------------------------------------------
// *                Posts
// *------------------------------------------
mongoose.connect(process.env.MONGO_URI);

const posts = async (req, res) => {
  try {
    const { title, content } = req.body;
    console.log(req.body);
    console.log(title, content);
    const post = new Post({ title, content });
    console.log(post);
    await post.save();
    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
};

// *------------------------------------------
// *                Posts Get
// *------------------------------------------
const retrieve = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to get posts" });
  }
};

// *------------------------------------------
// *                Track
// *------------------------------------------
mongoose.connect(process.env.MONGO_URI);

const track = async (req, res) => {
  try {
    const tracks = await Report.find();
    res.status(200).json(tracks);
  } catch (error) {
    res.status(500).json({ error: "Failed to get tracks" });
  }
};

module.exports = {
  home,
  register,
  login,
  user,
  report,
  posts,
  track,
  retrieve,
};
