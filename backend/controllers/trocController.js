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

// @desc Get User troc
// @route GET /api/troc/:id
// @ access Private
const getTroc = asyncHandler(async (req, res) => {
    // get user using the id and JWT
    
    const user = await User.findById(req.user.id)
    
    if (!user) {
        res.status(401)
        throw new Error('Uttilisateur non trouvé')
    }
    const troc = await Troc.findById(req.params.id)
    
    if(troc.user.toString() !== req.user.id ){
        res.status(401)
        throw new Error("Vous n'avez pas accées a ce troc")

    }
    
    
    if(!troc) {
        res.status(404)
        throw new Error("Le troc demandée n'a pas étè trouver")
    }
    res.status(200).json(troc)
  })

// @desc Create new troc
// @route  POST /api/trocs
// @ access Private
const createTroc = asyncHandler(async (req, res) => {
  const { title, type, description, status } = req.body

  if (!title || !description) {
    res.status(400)
    throw new Error("Merci d'entrez un titre et une déscription")
  }

  if (!type) {
    res.status(400)
    throw new Error("Merci d'entrez un type de troc")
  }
  // get user using the id and JWT
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('Uttilisateur non trouvé')
  }
  const ticket = await Troc.create({
    title,
    description,
    type,
    user: req.user.id,
    status: 'publiée',
  })
  res.status(201).json(ticket)
})

// @desc  Delete troc
// @route DELETE /api/trocs/:id
// @ access Private
const deleteTroc = asyncHandler(async (req, res) => {
    // get user using the id and JWT
  
    const user = await User.findById(req.user.id)
  
    if (!user) {
      res.status(401)
      throw new Error('Uttilisateur non trouvé')
    }
  
    const troc = await Troc.findById(req.params.id)
  
    if (troc.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error("Vous n'avez pas accées a ce troc")
    }
    
    if (!troc) {
        res.status(404)
        throw new Error("Le troc demandée n'a pas étè trouver")
    }
    await troc.remove()
    res.status(200).json({success: true})
  })


  
// @desc Update User troc
// @route PUT /api/trocs/:id
// @ access Private
const updateTroc = asyncHandler(async (req, res) => {
    // get user using the id and JWT
  
    const user = await User.findById(req.user.id)
  
    if (!user) {
      res.status(401)
      throw new Error('Uttilisateur non trouvé')
    }
  
    const troc = await Troc.findById(req.params.id)
  
    if (troc.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error("Vous n'avez pas accées a ce troc")
    }
  
    if (!troc) {
      res.status(404)
      throw new Error("Le troc demandée n'a pas étè trouver")
    }

    const updatedTroc = await Troc.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json(updatedTroc)
  })




module.exports = {
  getTrocs,
  createTroc,
  getTroc,
  updateTroc,
  deleteTroc,
}
