
require('dotenv').config();
const Admins = require('./admin-model.js');
const Kennels = require('./kennels-model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtKey = process.env.JWT_SECRET || 'this is just a test';
const secret = process.env.JWT_SECRET || 'this is just a test';
// quickly see what this file exports
module.exports = {
  authenticate,
  register,
  login
};
// implementation details
function authenticate(req, res, next) {
  const token = req.get('Authorization');
  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) {
        res.status(401).json(err);
      }
      else{
        req.decoded = decoded;
        console.log(decoded)
        next();
      } 
    })
  } else {
    res.status(401).json({ error: 'No token provided, must be set on the Authorization Header'});
  }
}
async function register(user) {
    let { username, password } = user
    const name = user.kennel_name
    // implement user registration
    const hash = bcrypt.hashSync(password, 12); // 2 ^ n
    password = hash;
    const addKennel = await Kennels.add({name})
    const saved = await Admins.add({username, password, 'kennel_id': addKennel.kennel.id})
    console.log('saved',saved)
    try {
      return ({token: generateToken(saved.admin), id: saved.admin.id })
    } catch (error) {
      return error 
    }
  }
  //Generate Token
  function generateToken(user){
    const payload = {
        id: user.id,
        username: user.username,
    };
    const options ={
        expiresIn: '24h',
    };
    return jwt.sign(payload, secret, options)
    }
function login(req, res) {
// implement user login
let { username, password } = req.body;
Admins.findBy({ username })
    .first()
    .then(user => {
    
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user); // new
        res.status(200).json({
        message: `Welcome ${user.username}!, have a token...`,
        token,
        id: user.id,
        });
    } else {
        res.status(401).json({ message: 'Invalid Credentials' });
    }
    })
    .catch(error => {
    res.status(500).json(error);
    });
}
