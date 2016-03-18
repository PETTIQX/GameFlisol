var express = require('express')
var auth = require('./auth')
var router = express.Router()

router.use('/public', require('./public'))
router.use('/private', auth, require('./private'))

module.exports = router
