const router = require("express").Router();
const Auth = require('../models/auth-model.js')
const Admins = require('../models/admin-model.js');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

router.post('/register', (req, res) => {
    const user = req.body
    Auth.register(user)
    .then(data => {
        console.log(data)
        res.status(200).json(data)
    }).catch(err => {
        res.status(500).json({ message: ` Failed to register `, error: err });
    });
});
router.post('/login', (req, res) => {
    const {username, password} = req.body
    Auth.login(username)
    .then(user => {
        console.log(user)
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = Auth.generateToken(user); // new
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
});
router.get('/:id', (req, res) => {
 Admins.findById(req.params.id)
.then(data =>{
    res.status(200).json(data)
})
.catch(err =>{
    res.status(500).json(error) 
})
});
// Delete an Admin 
router.delete('/:id', (req, res) => {
  Admins.remove(req.params.id)
    .then(data =>{
        res.status(200).json(data)
    })
    .catch(error =>{
        res.status(500).json(error) 
    })
});
// Add a new Dog
router.post('/dogs', (req, res) => {
  const dog =  req.body
  Admins.addDog(dog)
  .then(data=>
    res.status(201).json(data))
.catch(err=>{
    res.status(500).json(err)
})
});
// Edit a Dog
router.put('/dogs/:id', (req, res) => {
    const changes = req.body
    Admins.updateDog(req.params.id, changes)
    .then(data=>
        res.status(200).json(data))
    .catch(err=>{
        res.status(500).json(err)
    })
});
// Get Nofitications
router.get('/notifications/:id', (req, res) => {
    const id = req.params.id
    Admins.getNotifications(id)
    .then(data=>
        res.status(200).json(data))
    .catch(err=>{
        res.status(500).json(err)
    })
});

module.exports = router;