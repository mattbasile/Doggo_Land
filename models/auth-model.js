
require('dotenv').config();
const Admins = require('./admin-model.js');

const jwt = require('jsonwebtoken');

const jwtKey = process.env.JWT_SECRET || 'this is just a test';

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
function register(req, res) {
    // implement user registration
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 12); // 2 ^ n
    user.password = hash;
  
    Admins.add(user)
      .then(saved => {
        res.status(201).json({token:generateToken(saved), id: saved.id});
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
  //Generate Token
function generateToken(user){
const payload = {
    org_id: user.id,
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
