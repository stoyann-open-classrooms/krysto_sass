const express = require('express')
const router = express.Router()

const {getTrocs, getTroc, createTroc, deleteTroc, updateTroc} = require('../controllers/trocController')
const {protect} = require('../middleware/authMiddleware')


router.route('/').get(protect, getTrocs).post(protect, createTroc)

router.route('/:id').get(protect, getTroc).delete(protect, deleteTroc).put(protect, updateTroc)
module.exports = router