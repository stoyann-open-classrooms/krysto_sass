const mongoose = require('mongoose')

const userShema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Vous devez entrez votre nom'],
    },
    email: {
      type: String,
      required: [true, 'Vous devez entrez un email valide'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Vous devez entrez un mot de passe'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timesStamps: true,
  },
)


module.exports = mongoose.model('User', userShema)