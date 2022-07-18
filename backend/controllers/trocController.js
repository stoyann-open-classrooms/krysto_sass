const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Troc = require('../models/trocModel')

// @desc Get User trocs
// @route GET /api/trocs
// @ access Private
const getTrocs = asyncHandler(async (req, res) => {
  // get user using the id and JWT

  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('Uttilisateur non trouvé')
  }

  const trocs = await Troc.find({ user: req.user.id })
  res.status(200).json(trocs)
})

// @desc Create new troc
// @route  POST /api/trocs
// @ access Private
const createTroc = asyncHandler(async (req, res) => {
    
    const {title,  type , description, status} = req.body
    
    if(!title || !description) {
        res.status(400)
        throw new Error("Merci d'entrez un titre et une déscription")
    } 
    
    if(!type) {
        res.status(400)
        throw new Error("Merci d'entrez un type de troc")
    } 
// get user using the id and JWT
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('Uttilisateur non trouvé')
    }
  const ticket  = await Troc.create({
    title,
    description,
    type,
    user: req.user.id,
    status: 'publiée'
  })
  res.status(201).json(ticket)
})


module.exports = {
  getTrocs,
  createTroc,
}
