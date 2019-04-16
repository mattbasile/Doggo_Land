const router = require("express").Router();
const {authenticate} = require('../models/auth-model.js')
const Admins = require('../models/admin-model.js');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register/:id', (req, res) => {
    const id = req.params.id
    Admins.findById(id)
    .then(data=> {
        res.status(200).json(data)
    })
    .catch(err => {
        res.status(500).json({ message: ` Failed to get Admin `, error: err });
      });
});
router.post('/login', (req, res) => {
    
});
module.exports = router;