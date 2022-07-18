const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// @desc Get User tickets
// @route GET /api/tickets
// @ access Private
const getTickets = asyncHandler(async (req, res) => {
  // get user using the id and JWT

  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('Uttilisateur non trouvé')
}

const tickets = await Ticket.find({ user: req.user.id })
res.status(200).json(tickets)
})

// @desc Create new ticket
// @route  POST /api/tickets
// @ access Private
const createTicket = asyncHandler(async (req, res) => {
    
    const {product, description} = req.body
    
    if(!product || !description) {
        res.status(400)
        throw new Error("Merci d'entrez un produit et une description")
    }
// get user using the id and JWT
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('Uttilisateur non trouvé')
    }
  const ticket  = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new'
  })
  res.status(201).json(ticket)
})

module.exports = {
  getTickets,
  createTicket,
}
