const {addMessage, getAllMessages} = require('../controller/msgController');
const router = require('express').Router();

router.post('/addmsg', addMessage);
router.post('/getmsg', getAllMessages);

module.exports = router;