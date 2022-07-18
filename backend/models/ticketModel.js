const mongoose = require('mongoose')

const ticketShema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true],
      ref: 'User'
    },
    product: {
      type: String,
      required: [true, 'Merci de selectioner un produit'],
      enum: ['iPhone', 'Mackbook pro', 'Imac', 'iPad' ]
    },
    description: {
      type: String,
      required: [true, "Merci d'entrer une description pour votre issue"],
    },
    status: {
      type: String,
      required: true,
      enum:[ 'new', 'open', 'closed'],
      default: 'new',
    },
  },
  {
    timesStamps: true,
  },
)


module.exports = mongoose.model('Ticket', ticketShema)