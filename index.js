require('dotenv').config(); 

const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);
const server = express();
// Multer
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
      console.log(file)
      cb(null, file.originalname)
    }
  })
server.use(express.json());

server.get('/', (req, res) => {
    res.send("Woof Woof! We Out the Pound!")
});
server.post('/upload', (req, res, next) => {
    const upload = multer({ storage }).single('name-of-input-key')
    upload(req, res, function(err) {
      if (err) {
        return res.send(err)
      }
      console.log('file uploaded to server')
      console.log(req.file)
      const cloudinary = require('cloudinary').v2
      cloudinary.config({
        cloud_name: ,
        api_key: '###!!!###',
        api_secret: '###!!!###'
      })
    })
  })


const port = process.env.PORT || 5000;
server.listen(port, ()=> console.log(`\n Running on port ${port}\n`))
// server.listen(5000, ()=> console.log(`\n Running on port 5000 \n`))