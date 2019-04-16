const router = require("express").Router();
const Dogs = require("../models/dogs-model.js");


router.get('/', (req, res) => {
    Dogs.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: ` Failed to get Dogs `, error: err });
    });
});
router.get('/:id', (req, res) => {
    Dogs.findById(req.params.id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: ` Failed to get Dog `, error: err });
    });
});
router.post('/', (req, res) => {
    Dogs.add(req.body)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: ` Failed to add Dog `, error: err });
    });
});
router.put('/:id', (req, res) => {
    const changes = req.body;
    const id = req.params;
    Dogs.update(id, changes)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: ` Failed to update Dog `, error: err });
    });
});

router.delete('/:id', (req, res) => {
  Dogs.remove(req.params)
  .then(data => {
    if (data > 0) {
      res.status(200).json({message:"Dog Removed"});
    } else {
      res.status(404).json({ message: `The Campaign with the specified ID does not exist` });
    }
  })
  .catch(err => {
    res.status(500).json({ message: `Failed to delete Campaign`, error: err });
  });
});
module.exports = router;