import jwt, { decode } from 'jsonwebtoken';
import db from "../models/index.js";

const auth = async (req, res, next) => {

  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db.User.findByPk(decoded.id);

    if(!user) {
      throw new Error()
    }

    req.token = token;
    req.user = user

    next();

  } catch (error) {
     res.status(401).send({error: 'Please Authenticate'})
  }
}
export default auth