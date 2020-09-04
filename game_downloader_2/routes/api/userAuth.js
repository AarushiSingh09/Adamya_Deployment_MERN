import { Router } from 'express';
const router = Router();
import { check, validationResult } from "express-validator";
const config = require("config");
import crypto from 'crypto'
import User from "../../models/User";
import { sign } from 'jsonwebtoken';
import { compare, genSalt, hash } from "bcryptjs";
import userAuth from "../../middleware/userAuth";
import mongoose from 'mongoose';
import sendMail from '../../utils/mail/sendMail';
import { confirm, forgot } from '../../utils/mail/templateMail';
// @route       POST api/userAuth/register
// @desc        Create/Add a new user
// @access      Public

router.post(
  "/register",
  //**********************************Validations**********************************/
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),

    check("email", "Please input valid email").isEmail(),

    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //**********************************Handler Code**********************************/

      const { email, name, password } = req.body;
      let user = await User.findOne({ email });
      const salt = await genSalt(10);

      if (user) {
        return res.status(400).json({ errors: { msg: "User Already Exists" } });
      }

      const avatar = config.get("avatarBaseURI") + name.replace(" ", "+");
      const verificationToken = crypto.randomBytes(128).toString('hex');
      user = new User({
        name,
        email,
        password,
        avatar,
        verificationToken,
        verificationValid : Date.now() + 43200000
      });

      user.password = await hash(password, salt);

      await user.save();
      sendMail(email, confirm(verificationToken));

      const payload = {
        user: {
          id: user.id,
          verified: false
        }
      };

      sign(payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 }, (err, token) => {
          if (err) throw err;
          res.json({ token })
        });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ errors: { msg: "Server Error!" } });
    }
  }
);

// @route       POST api/userAuth/login
// @desc        Login/ Get auth token
// @access      Public

router.post(
  "/login",
  //**********************************Validations**********************************/
  [
    check("email", "Please input valid email").isEmail(),
    check("password", "Password is required").exists()
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //**********************************Handler Code**********************************/

    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: { msg: "Invalid Credentials" } });
      }

      const cresentialCheck = await compare(password, user.password);
      if (!cresentialCheck) {
        return res.status(400).json({ errors: { msg: "Invalid Credentials" } });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token, emailVerified:user.emailVerified });
        }
      );
    } catch(err) {
      console.log(err.message);
      res.status(500).json({ errors: { msg: "Server Error!" } });
    }
  }
);

// @route       POST api/userAuth/forgot
// @desc        Forgot password mail trigger
// @access      Public

router.post(
  "/forgot",
  //**********************************Validations**********************************/
  [
    check("email", "Please input valid email").isEmail()
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //**********************************Handler Code**********************************/

    try {
      const { email } = req.body;
      const verificationToken = crypto.randomBytes(128).toString('hex');
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: { msg: "Email Not Found" } });
      }
      user.verificationToken = verificationToken;
      user.verificationValid = Date.now() + 43200000;      
      await sendMail('prashant95c@gmail.com', forgot(verificationToken));
      await user.save();
      res.json({ success:"Email Sent!" });
     
    } catch(err) {
      console.log(err.message);
      res.status(500).json({ errors: { msg: "Server Error!" } });
    }
  }
);

// @route       GET api/userAuth/confirm/:verificationToken
// @desc        Confirmation for verification and reset password
// @access      Public


router.get('/confirm/:verificationToken', async (req, res) => {
  try{
    const { verificationToken } = req.params;
    let user = await User.findOne({verificationToken});

    if (!user) {
        return res
          .status(400)
          .json({ errors: { msg: "Token Invalid" } });
    }

    if(Date.now() - Date.parse(user.verificationValid) > 0) {
      user.verificationToken = '';
      user.verificationValid = null;
      user.save();
      return res.status(403).json({errors:{msg:'Token Expired!'}});
    }
    user.save();
    return res.json({ emailVerification:!user.emailVerified });
  } catch(err) {
    console.log(err.message);
    res.status(500).json({ errors: { msg: "Server Error!" } });
  }
});


// @route       POST api/userAuth/resetPass
// @desc        Reset password
// @access      Public


router.post('/resetPass', async (req, res) => {
  try{
    const { verificationToken, password } = req.body;
    let user = await User.findOne({verificationToken});
    if (!user) {
      return res
        .status(400)
        .json({ errors: { msg: "Token Invalid" } });
    }
    user.verificationToken = '';
    if(Date.now() - Date.parse(user.verificationValid) > 0) {
      user.verificationValid = null;
      user.save();
      return res.status(403).json({errors:{msg:'Token Expired!'}});
    } else {
      const salt = await genSalt(10);
      user.verificationValid = null;
      user.password = await hash(password, salt);
      user.emailVerified = true;
      user.save();
      return res.json({ success:"Password Reset Successful!" });
    }
  } catch(err) {
    console.log(err.message);
    res.status(500).json({ errors: { msg: "Server Error!" } });
  }
});

// @route       POST api/userAuth/login
// @desc        Login/ Get user details
// @access      Public

router.get("/", userAuth, async (req, res) => {

  try {
    const user = await User.findOne(mongoose.Types.ObjectId(req.user.id));
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ errors: { msg: "Server Error!" } });
  };
});


export default router;