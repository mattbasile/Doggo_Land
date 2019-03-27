require('dotenv').config(); 
const express = require('express');
const db = require("./data/dbConfig.js");
const server = express();
const kennelsRoutes = require('./routes/kennels-routes.js');
const dogRoutes = require('./routes/dogs-routes.js');
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
server.use("/api/kennels", kennelsRoutes);
server.use("/api/dogs", dogRoutes);

server.get('/', (req, res) => {
    res.send("Woof Woof! We Out the Pound!")
});

server.post('/upload', (req, res, next) => {
    const upload = multer({ storage }).single('upload-image')
    upload(req, res, function(err) {
      if (err) {
        return res.send(err)
      }
      console.log('file uploaded to server')
      console.log(req.file)
      const cloudinary = require('cloudinary').v2
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API,
        api_secret: process.env.CLOUD_SECRET,
      })
      const path = req.file.path
      const uniqueFilename = new Date().toISOString()
  
      cloudinary.uploader.upload(
        path,
        { public_id: `doggo-land/${uniqueFilename}`, tags: `doggo-land` }, // directory and tags are optional
        function(err, image) {
          if (err) return res.send(err)
          console.log('file uploaded to Cloudinary')
          // remove file from server
          const fs = require('fs')
          fs.unlinkSync(path)
          // return image details
          res.json(image)
        }
      )
    })
})


const port = process.env.PORT || 5000;
server.listen(port, ()=> console.log(`\n Running on port ${port}\n`))
// server.listen(5000, ()=> console.log(`\n Running on port 5000 \n`))