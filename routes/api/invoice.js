// Invoice route
const express = require('express')
const invoiceRoutes = express.Router()

const Invoice = require('../../models/Invoice')

// add route
invoiceRoutes.route('/add').post((req, res) => {
  let invoice = new Invoice(req.body)
  invoice.save()
  .then(invoice => {
    res.status(200).json({ 'invoice': 'Invoice Added Successfully' })
  })
  .catch(err => {
    res.status(400).send('Unable to save to database')
  })
})

// get all route
invoiceRoutes.route('/').get((req, res) => {
  Invoice.find((err, invoices) => {
    if(err) {
      console.log(err)
    } else {
      res.json(invoices)
    }
    return
  })
})

// edit route
invoiceRoutes.route('/edit/:id').get((req, res) => {
  let id = req.params.id
  Invoice.findById(id, (err, invoice) => {
    res.json(invoice)
  })
})

// update route
invoiceRoutes.route('/update/:id').post((req, res) => {
  Invoice.findById(req.params.id, (err, invoice) => {
    if(!invoice) {
      res.status(400).send('data not found')
    } else {
      invoice.invoiceNumber = req.body.invoiceNumber
      invoice.status = req.body.status
      invoice.createdBy = req.body.createdBy
      invoice.dueDate = req.body.dueDate
      invoice.custCode = req.body.custCode
      invoice.goldPrice = req.body.goldPrice
      invoice.goldBalance = req.body.goldBalance
      invoice.silverPrice = req.body.silverPrice
      invoice.silverBalance = req.body.silverBalance
      invoice.platinumPrice = req.body.platinumPrice
      invoice.platinumBalance = req.body.platinumBalance
      invoice.brassPrice = req.body.brassPrice
      invoice.brassBalance = req.body.brassBalance
      invoice.metalTotal = req.body.metalTotal
      invoice.laborTotal = req.body.laborTotal
      invoice.invoiceTotal = req.body.invoiceTotal

      invoice.save()
        .then(invoice => res.json('Update complete'))
        .catch(err => res.status(400).send('Unable to update database'))
    }
  })
})

// delete route
invoiceRoutes.route('/delete/:id').get((req, res) => {
  Invoice.findByIdAndRemove({ _id: req.params.id }, (err, invoice) => {
    if(err) res.json(err)
    else res.json('Successfully removed')
  })
})


module.exports = invoiceRoutes
