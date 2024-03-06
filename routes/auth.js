import express from "express";
import User from "../models/user/user.js";
import { comparePassword, creatingHashPassword } from "../utils/hash.js";
import { jwtGen } from "../utils/jwt.js";

const router = express.Router();

router.get("/sign-up", async (req, res) => {
  try {
    const { userName, password, email } = req.body;

    if (!userName?.trim() || !password?.trim() || !email?.trim()) {
      return res.send({ message: "please fill all the filed", success: false });
    }

    const isUserAlreadyExists = await User.findOne({
      email,
    });

    if (isUserAlreadyExists) {
      return res.send({
        message: "This Email is already exists",
        success: false,
      });
    }



    const hashPassword = await creatingHashPassword(password)

    const newUser =  new User({
      email,
      userName,
      password : hashPassword,
    });

    const userResponse = await newUser.save();

    res.send({
      message: "user successfully sign up please verify your email",
      success: true,
    });
  } catch (error) {
    console.log(error)
    res.send({ message: "server side error", success: false });
  }
});

router.get("/sign-in", async (req, res) => {
  try {
    const { email, password,  } = req.body;

    if ( !password?.trim() || !email?.trim()) {
      return res.send({ message: "please fill all the filed", success: false });
    }

    const isUserAlreadyExists = await User.findOne({
      email,
    });

    if (!isUserAlreadyExists) {
      return res.send({
        message: "This Email is not  exists",
        success: false,
      });
    }

    
  if(!(await comparePassword(password , isUserAlreadyExists.password))) {
    return res.send({
      message: "credentials does not match",
      success: false,
    });
  }

  

  const token = jwtGen(isUserAlreadyExists)

    res.send({
      message: "user successfully sign in",
      success: true,
      token: token
    });
  } catch (error) {
    console.log(error)
    res.send({ message: "server side error", success: false });
  }
});

export default router;
