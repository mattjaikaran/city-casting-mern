const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Invoice = new Schema({
  custCode: String,
  user: String,
  invoiceNumber: Number,
  userInfo: {
    phone: String,
    fax: String
  },
  lineItems: [
    {
      weight: Number,
      pieces: Number,
      metal: String,
      styleNumber: String,
      description: String,
      labor: Number,
      laborPC: Number,
      priceDWT: Number,
      lineTotal: Number
    }
  ],
  metalTotal: Number,
  laborTotal: Number,
  otherCharges: Number,
  shippingTotal: Number,
  invoiceTotal: Number,
  goldPrice: Number,
  goldBalance: Number,
  goldUsed: Number,
  newGoldBalance: Number,
  platinumPrice: Number,
  platinumBalance: Number,
  silverPrice: Number,
  silverBalance: Number,
  brassPrice: Number,
  brassBalance: Number,
  createdBy: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  dueDate: Date,
  status: {
    type: String,
    default: 'Pending'
  }
},{
    collection: 'invoice'
})

module.exports = mongoose.model('Invoice', Invoice)
