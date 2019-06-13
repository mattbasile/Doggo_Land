const router = require("express").Router();
const Auth = require('../modules/auth-module.js')
const Admins = require('../modules/admin-module.js');
const Dogs = require('../modules/dogs-module.js');
const Breeds = require('../modules/breeds-module.js');
const bcrypt = require('bcryptjs');

// Get All Breeds
router.get('/breeds', (req, res) => {
    console.log("heherheerh")
    Breeds.find()
    .then(data =>{
        res.status(200).json(data)
    })
    .catch(err =>{
        res.status(500).json(err) 
    })
});
router.post('/register', (req, res) => {
    const user = req.body
    if(!user.username && !user.password ) {
      res.status(401).json({ message: "Please provide a username and password for this user."})
    }
    else {
    Auth.register(user)
     .then(data => {
      res.status(200).json(data)
     })
     .catch(err => {
      res.status(500).json({ message: ` Failed to register `, error: err });
     });
    }
  });
router.post('/login', (req, res) => {
    const {username, password} = req.body
    Auth.login(username)
    .then(user => {
        console.log(user)
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = Auth.generateToken(user); // new
        res.status(200).json({
        token,
        id: user.id,
        kennel_id: user.kennel_id,
        username: user.username,
        name: user.name,
        bio: user.bio,
        location: user.location,
        email: user.email,
        phone: user.phone,
        img_url: user.img_ulr,
        dogs: user.dogs,
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
    res.status(500).json(err) 
})
});
// Update a Admin
router.put('/:id', (req, res) => {
    const changes = req.body
    Admins.updateAdmin(req.params.id, changes)
    .then(data=>
        res.status(200).json(data))
    .catch(err=>{
        res.status(500).json(err)
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
  Dogs.add(dog)
  .then(data=>
    res.status(201).json(data))
.catch(err=>{
    console.log(err)
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
// Delete A Dog
router.delete('/dogs/:id', (req, res) => {
    Admins.removeDog(req.params.id)
    .then(data =>{
        res.status(200).json(data)
    })
    .catch(error =>{
        res.status(500).json(error) 
    })
});
// Remove a Breed
router.delete('/breeds/remove', (req, res) => {
    const {dog_id, breed_id} = req.body
    Admins.removeBreed(dog_id, breed_id)
    .then(data =>{
        res.status(200).json(data)
    })
    .catch(error =>{
        res.status(500).json(error) 
    })
});
//Assign a Breed
router.post('/breeds/assign', (req, res)=>{
    const {dog_id, breed_id} = req.body
    console.log(dog_id, breed_id)
    Admins.assignBreed(dog_id, breed_id)
    .then(data=>{
        res.status(201).json(data)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
})
// Add a new Breed 
router.post('/breeds/add', (req, res) => {
    const breed = req.body
    Admins.addBreed(breed)
    .then(data=>{
        res.status(201).json(...data)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
});

// Edit a Kennel
router.put('/kennels/:id', (req, res) => {
   const changes = req.body
   Admins.updateKennel(req.params.id, changes)
   .then(data=>
       res.status(200).json(data))
   .catch(err=>{
       res.status(500).json(err)
   })
});
// Get Nofitications --- id == admin.kennel_id 
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