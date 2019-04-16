const router = require("express").Router();
const Auth = require('../models/auth-model.js')
const Admins = require('../models/admin-model.js');

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
    
});
module.exports = router;