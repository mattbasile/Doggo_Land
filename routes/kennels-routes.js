const router = require("express").Router();
const Kennels = require("../models/kennels-model.js");


router.get('/', (req, res) => {
    Kennels.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: ` Failed to get Kennels `, error: err });
    });
});
router.get('/:id', (req, res) => {
    Kennels.findById(req.params.id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: ` Failed to get Kennel `, error: err });
    });
});
router.post('/', (req, res) => {
    Kennels.add(req.body)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: ` Failed to add Kennel `, error: err });
    });
});
router.put('/:id', (req, res) => {
    const changes = req.body;
    const id = req.params;
    Kennels.update(id, changes)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: ` Failed to update Kennel `, error: err });
    });
});

router.delete('/:id', (req, res) => {
  Kennels.remove(req.params)
  .then(data => {
    if (data > 0) {
      res.status(200).json({message:"Kennel Removed"});
    } else {
      res.status(404).json({ message: `The Campaign with the specified ID does not exist` });
    }
  })
  .catch(err => {
    res.status(500).json({ message: `Failed to delete Campaign`, error: err });
  });
});
module.exports = router;