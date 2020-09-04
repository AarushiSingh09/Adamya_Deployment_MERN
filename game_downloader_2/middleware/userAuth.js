import { verify } from 'jsonwebtoken';
const config = require('config')

let userAuth = async(req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }


  try {
    await verify(token, config.get('jwtSecret'), (error, decoded)=>{
      if(error){
        res.status(401).json({ msg: 'Token is not valid' });
      }
      else{
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error('check auth middleware for '+ err.message)
    res.status(500).json({errors:{ msg: 'Server Error'} });
  }
};

export default userAuth