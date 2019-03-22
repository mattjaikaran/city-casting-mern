const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmployeeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true
  },
  isSuperAdmin: {
    type: Boolean,
    default: false,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
})

module.exports = User = mongoose.model('employees', EmployeeSchema)
