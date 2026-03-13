import express from 'express';
import jwt from 'jsonwebtoken';
import db from "../models/index.js";

const router = express.Router();

//register new user: localhost:8090/api/auth/register
router.post('/register', async (req, res) => {
  try {
    const user = await db.User.create(req.body);
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET)
    res.status(201). send({user, token})

  } catch (error) {
    res.status(400).send({error: error.message})
  }
})

//Login user
router.post('/login', async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: {
        email: req.body.email
      }
    })
    if(!user) {
      throw new Error('user not found')
    }

    const isMatch = await user.comparePassword(req.body.password)
    if(!isMatch) {
      throw new Error('Password does not match')
    } 
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET)
    res.send({user, token})

  } catch (error) {
    res.status(400).send({error: 'Unable to login'})
  }
})
export default router;