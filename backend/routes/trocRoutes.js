const express = require('express')
const router = express.Router()

const {getTrocs, createTroc} = require('../controllers/trocController')
const {protect} = require('../middleware/authMiddleware')


router.route('/').get(protect, getTrocs).post(protect, createTroc)


module.exports = router