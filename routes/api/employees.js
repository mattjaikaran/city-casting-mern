const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('../../config/keys')
const passport = require('passport')

const User = require('../../models/Employee')

// @route   GET api/employees/test
// @desc    Tests users route
// @access  Public
router.get('/test', async (req, res) => await res.json({ msg: "Users work" }))
