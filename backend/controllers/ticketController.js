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

// @desc Get User ticket
// @route GET /api/tickets/:id
// @ access Private
const getTicket = asyncHandler(async (req, res) => {
  // get user using the id and JWT

  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('Uttilisateur non trouvé')
  }

  const ticket = await Ticket.findById(req.params.id)

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("Vous n'avez pas accées a ce troc")
  }

  if (!ticket) {
    res.status(404)
    throw new Error("Le troc demandée n'a pas étè trouver")
  }
  res.status(200).json(ticket)
})

// @desc Create new ticket
// @route  POST /api/tickets
// @ access Private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body

  if (!product || !description) {
    res.status(400)
    throw new Error("Merci d'entrez un produit et une description")
  }
  // get user using the id and JWT
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('Uttilisateur non trouvé')
  }
  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new',
  })
  res.status(201).json(ticket)
})


// @desc  Delete ticket
// @route DELETE /api/tickets/:id
// @ access Private
const deleteTicket = asyncHandler(async (req, res) => {
    // get user using the id and JWT
  
    const user = await User.findById(req.user.id)
  
    if (!user) {
      res.status(401)
      throw new Error('Uttilisateur non trouvé')
    }
  
    const ticket = await Ticket.findById(req.params.id)
  
    if (ticket.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error("Vous n'avez pas accées a ce ticket")
    }
    
    if (!ticket) {
        res.status(404)
        throw new Error("Le ticket demandée n'a pas étè trouver")
    }
    await ticket.remove()
    res.status(200).json({success: true})
  })


  
// @desc Update User ticket
// @route PUT /api/tickets/:id
// @ access Private
const updateTicket = asyncHandler(async (req, res) => {
    // get user using the id and JWT
  
    const user = await User.findById(req.user.id)
  
    if (!user) {
      res.status(401)
      throw new Error('Uttilisateur non trouvé')
    }
  
    const ticket = await Ticket.findById(req.params.id)
  
    if (ticket.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error("Vous n'avez pas accées a ce ticket")
    }
  
    if (!ticket) {
      res.status(404)
      throw new Error("Le ticket demandée n'a pas étè trouver")
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedTicket)
  })

module.exports = {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
}
