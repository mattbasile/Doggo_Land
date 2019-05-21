const router = require("express").Router();
const Breeds = require("../modules/breeds-module.js");

router.get('/', (req, res) => {
    Breeds.find()
    .then(data=>{
        res.status(200).json(data)
    })
    .catch( err=> {
            res.status(500).json({ message: ` Failed to get Breeds `, error: err });
        }
    )
});

router.get('/:id', (req, res) => {
    console.log(req.params.id)
    Breeds.findBreeds(req.params.id)
    .then(data=>{
        res.status(200).json(data)
    })
    .catch( err=> {
            res.status(500).json({ message: ` Failed to get Breeds `, error: err });
        }
    )
});
module.exports = router;