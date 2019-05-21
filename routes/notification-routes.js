const router = require("express").Router();
const Notifications = require("../modules/notifications-module.js");


router.post('/', (req, res) => {
   const date_sent = Date.now()
   const notification = {...req.body, date_sent}
   Notifications.add(notification)
   .then(data=>res.status(201).json(data))
   .catch(err => res.status(500).json(err))
});
router.get('/', (req, res) => {
    Notifications.find()
   .then(data=>res.status(200).json(data))
   .catch(err => err)
});
router.get('/admin/:id', (req, res) => {
    Notifications.findByAdmin(req.params.id)
   .then(data=>res.status(200).json(data))
   .catch(err => err)
});


module.exports = router;