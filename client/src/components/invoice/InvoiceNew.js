import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import DateTimePicker from 'react-datetime-picker'
import Select from 'react-select'

class InvoiceNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      invoiceNumber: '',
      createdAt: new Date().toLocaleString(),
      dueDate: '',
      createdBy: '',
      custCode: '',
      goldPrice: '',
      goldBalance: '',
      goldUsed: '',
      newGoldBalance: '',
      silverPrice: '',
      silverBalance: '',
      platinumPrice: '',
      platinumBalance: '',
      brassPrice: '',
      brassBalance: '',
      lineItems: [],
      lineWeight: '',
      linePieces: '',
      lineMetal: '',
      lineStyleNumber: '',
      lineDescription: '',
      lineLabor: '',
      lineLaborPC: '',
      linePriceDWT: '',
      lineTotal: '',
      metalTotal: '',
      laborTotal: '',
      shippingTotal: '',
      invoiceTotal: ''
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleChange = (metal) => {
    this.setState({ lineMetal: metal.value })
    console.log(metal)
  }

  onSubmit = (e) => {
    e.preventDefault()
    const obj = {
      invoiceNumber: this.state.invoiceNumber,
      createdBy: this.state.createdBy,
      createdAt: this.state.createdAt,
      dueDate: this.state.dueDate,
      custCode: this.state.custCode,
      goldPrice: this.state.goldPrice,
      goldBalance: this.state.goldBalance,
      goldUsed: this.state.goldUsed,
      newGoldBalance: this.state.newGoldBalance,
      silverPrice: this.state.silverPrice,
      silverBalance: this.state.silverBalance,
      platinumPrice: this.state.platinumPrice,
      platinumBalance: this.state.platinumBalance,
      brassPrice: this.state.brassPrice,
      brassBalance: this.state.brassBalance,
      lineItems: this.state.lineItems,
      metalTotal: this.state.metalTotal,
      laborTotal: this.state.laborTotal,
      shippingTotal: this.state.shippingTotal,
      invoiceTotal: this.state.invoiceTotal
    }
    axios.post('/api/invoice/add', obj)
      .then(res => this.props.history.push('/invoice'))

  }

  dueDate = (dueDate) => {
    this.setState({ dueDate })
  }

  //calculate line total
  lineTotal = (e) => {
    e.preventDefault()
    const total = ((this.state.lineWeight * (this.state.linePriceDWT + this.state.lineLabor)) + (this.state.linePieces * this.state.lineLaborPC));
    this.setState({
      lineTotal: total.toFixed(2)
    })
  }

  goldClick = (e) => {
    e.preventDefault()
    const { goldBalance, goldUsed } = this.state
    this.setState({
      goldUsed: goldUsed,
      newGoldBalance: (goldBalance - goldUsed).toFixed(2)
    })
  }

  addLine = (e) => {
    e.preventDefault()
    console.log('new line')
    const lineObj = {
      weight: this.state.lineWeight,
      pieces: this.state.linePieces,
      metal: this.state.lineMetal,
      styleNumber: this.state.lineStyleNumber,
      description: this.state.lineDescription,
      labor: this.state.lineLabor,
      laborPC: this.state.lineLaborPC,
      priceDWT: this.state.linePriceDWT,
      lineTotal: this.state.lineTotal
    }
    this.state.lineItems.push(lineObj)
    console.log(this.state.lineItems)

    let invoiceTotal = this.state.lineItems.reduce((acc, lineItem) => {
      const lineTotal = lineItem.lineTotal
      const newSum = parseFloat(acc) + parseFloat(lineTotal)
      return newSum.toFixed(2)
    }, 0)

    const metalTotal = this.state.lineItems.reduce((acc, lineItem) => {
      if(lineItem.priceDWT === '') {
        lineItem.priceDWT = 0
        let mt = lineItem.weight * lineItem.priceDWT.toFixed(2)
        const newMt = parseFloat(acc) + parseFloat(mt)
        console.log(acc, mt)
        // console.log(`weight: ${lineItem.weight}, dwt: ${lineItem.priceDWT}, mt: ${newMt}`)
        return newMt.toFixed(2)
      } else if(lineItem.weight === '') {
        lineItem.weight = 0
        let mt = parseFloat(acc) + parseFloat(lineItem.weight)
        console.log(acc, mt)
        // console.log(`weight: ${lineItem.weight}, dwt: ${lineItem.priceDWT}, mt: ${mt}`)
        return mt.toFixed(2)
      } else if(lineItem.priceDWT > 0) {
        let mt = (parseFloat(lineItem.weight) * parseFloat(lineItem.priceDWT)).toFixed(2)
        const newMt = parseFloat(acc) + parseFloat(mt)
        // console.log(`weight: ${lineItem.weight}, dwt: ${lineItem.priceDWT}, newMt: ${newMt}`)
        return newMt.toFixed(2)
      } else if(lineItem.labor === '') {
        lineItem.labor = 0
        let mt = parseFloat(acc) + lineItem.labor
        return mt.toFixed(2)
      }
    }, 0)

    const laborTotal = this.state.lineItems.reduce((acc, lineItem) => {
      if(lineItem.laborPC === '') {
        lineItem.laborPC = 0
        const newLbrTotal = parseFloat(acc) + lineItem.laborPC
        return newLbrTotal.toFixed(2)
      } else {
        const lbrTotal = (parseFloat(lineItem.pieces) * parseFloat(lineItem.laborPC))
        const newLbrTotal = parseFloat(acc) + parseFloat(lbrTotal)
        return newLbrTotal.toFixed(2)
      }
    }, 0)

    this.setState({
      lineWeight: '',
      linePieces: '',
      lineMetal: '',
      lineStyleNumber: '',
      lineDescription: '',
      lineLabor: '',
      lineLaborPC: '',
      linePriceDWT: '',
      lineTotal: '',
      laborTotal: laborTotal,
      metalTotal: metalTotal,
      invoiceTotal: invoiceTotal
    })
  }

  // fix this.
  handleDeleteLine = (e, i) => {
    e.preventDefault()
    const lines = [...this.state.lineItems]
    lines.splice(i, 1)
    console.log(lines)
    this.setState({lineItems: lines})
  }
  // remove = (rowId) => {
  //   const lines = this.state.lineItems.filter((row) => row.id !== rowId)
  //   this.setState({data: lines})
  // };

  render() {
    const options = [
      { value: 'Gold', label: 'Gold' },
      { value: 'Silver', label: 'Silver' },
      { value: 'Platinum', label: 'Platinum' },
      { value: 'Brass', label: 'Brass' },
      { value: 'Bronze', label: 'Bronze' },
      { value: 'Thai', label: 'Thai' },
      { value: 'Copper', label: 'Copper' },
      { value: 'Choco', label: 'Choco' },
      { value: 'Argentium', label: 'Argentium' }
    ]
    return (
      <div style={{marginTop: 10}} >
      <h2 className="text-center">Add New Invoice</h2>
      <hr className="mt-3 mb-3" />
      <form onSubmit={this.onSubmit}>
        <div className="row">
          <div className="col-sm-6">
            <h4 className="text-center">Info</h4>
            <div className="form-group">
              <label>Invoice Number</label>
              <input
                type="text"
                name="invoiceNumber"
                onChange={this.onChange}
                value={this.state.invoiceNumber}
                className="form-control"/>
            </div>
            <div className="form-group">
              <label>Employee</label>
              <input
                type="text"
                name="createdBy"
                onChange={this.onChange}
                value={this.state.createdBy}
                className="form-control" />
            </div>
            <div className="form-group">
              <label>Date Created</label>
              <input
                type="text"
                name="createdAt"
                onChange={this.onChange}
                value={this.state.createdAt}
                className="form-control"
                readOnly />
            </div>
            <div className="form-group">
              <label>Due Date</label>
              <br />
              <DateTimePicker
                onChange={this.dueDate}
                value={this.state.dueDate}
              />
            </div>
            <div className="form-group">
              <label>Customer Code</label>
              <input
                type="text"
                name="custCode"
                onChange={this.onChange}
                value={this.state.custCode}
                className="form-control"/>
            </div>
          </div>
          <div className="col-sm-6">
            <h4 className="text-center">Balances</h4>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Gold Price</label>
                  <input
                    type="text"
                    name="goldPrice"
                    onChange={this.onChange}
                    value={this.state.goldPrice}
                    className="form-control" />
                </div>
                <div className="form-group">
                  <label>Gold Balance</label>
                  <input
                    type="text"
                    name="goldBalance"
                    onChange={this.onChange}
                    value={this.state.goldBalance}
                    className="form-control" />
                </div>
                <div className="form-group">
                  <label>Silver Price</label>
                  <input
                    type="text"
                    name="silverPrice"
                    onChange={this.onChange}
                    value={this.state.silverPrice}
                    className="form-control" />
                </div>
                <div className="form-group">
                  <label>Silver Balance</label>
                  <input
                    type="text"
                    name="silverBalance"
                    onChange={this.onChange}
                    value={this.state.silverBalance}
                    className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Platinum Price</label>
                  <input
                    type="text"
                    name="platinumPrice"
                    onChange={this.onChange}
                    value={this.state.platinumPrice}
                    className="form-control" />
                </div>
                <div className="form-group">
                  <label>Platinum Balance</label>
                  <input
                    type="text"
                    name="platinumBalance"
                    onChange={this.onChange}
                    value={this.state.platinumBalance}
                    className="form-control" />
                </div>
                <div className="form-group">
                  <label>Brass Price</label>
                  <input
                    type="text"
                    name="brassPrice"
                    onChange={this.onChange}
                    value={this.state.brassPrice}
                    className="form-control" />
                </div>
                <div className="form-group">
                  <label>Brass Balance</label>
                  <input
                    type="text"
                    name="brassBalance"
                    onChange={this.onChange}
                    value={this.state.brassBalance}
                    className="form-control" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="mt-5 mb-5" />

        <div className="form-group">
          <div className="row">
            <div className="col-sm-1 p-0">
              <label>Weight</label>
              <input
                type="text"
                name="lineWeight"
                onChange={this.onChange}
                value={this.state.lineWeight}
                className="form-control" />
            </div>
            <div className="col-sm-1 p-0">
              <label>Pieces</label>
              <input
                type="text"
                name="linePieces"
                onChange={this.onChange}
                value={this.state.linePieces}
                className="form-control" />
            </div>
            <div className="col-sm-2 p-0">
              <label>Metal</label>
              {/* <input
                type="text"
                name="lineMetal"
                onChange={this.onChange}
                value={this.state.lineMetal}
                className="form-control" /> */}
                <Select
                  name="lineMetal"
                  onChange={this.handleChange}
                  value={this.state.lineMetal}
                  options={options} />
            </div>
            <div className="col-sm-1 p-0">
              <label>Style #</label>
              <input
                type="text"
                name="lineStyleNumber"
                onChange={this.onChange}
                value={this.state.lineStyleNumber}
                className="form-control" />
            </div>
            <div className="col-sm-2 p-0">
              <label>Description</label>
              <input
                type="text"
                name="lineDescription"
                onChange={this.onChange}
                value={this.state.lineDescription}
                className="form-control" />
            </div>
            <div className="col-sm-1 p-0">
              <label>Labor</label>
              <input
                type="text"
                name="lineLabor"
                onChange={this.onChange}
                value={this.state.lineLabor}
                className="form-control" />
            </div>
            <div className="col-sm-1 p-0">
              <label>Labor_PC</label>
              <input
                type="text"
                name="lineLaborPC"
                onChange={this.onChange}
                value={this.state.lineLaborPC}
                className="form-control" />
            </div>
            <div className="col-sm-1 p-0">
              <label>Price/DWT</label>
              <input
                type="text"
                name="linePriceDWT"
                onChange={this.onChange}
                value={this.state.linePriceDWT}
                className="form-control" />
            </div>
            <div className="col-sm-2 text-right p-0">
              <label>Line Total</label>
              <input
                type="text"
                name="lineTotal"
                ref="lineTotal"
                onChange={this.onChange}
                value={this.state.lineTotal}
                className="form-control"
              />
            </div>
            <div className="mt-2">
              <button onClick={this.lineTotal} className="btn btn-success">
                + Calcuate Line Total
              </button>
              <br />
              <button onClick={this.addLine} className="btn btn-secondary mt-1 btn-block">
                + Add Line
              </button>
            </div>
          </div>
        </div>

        <div className="lineItemContent p-0">
          <table className="table table-striped">
            <thead>
              <tr className="addedLineHeadings">
                <th>Action</th>
                <th>Line</th>
                <th>Weight</th>
                <th>Pieces</th>
                <th>Metal</th>
                <th>Style</th>
                <th>Description</th>
                <th>Labor</th>
                <th>Labor_PC</th>
                <th>Price/DWT</th>
                <th>Line Total</th>
              </tr>
            </thead>
            <tbody>
              { this.state.lineItems.map((lineItem, i) => {
                const lineNumber = i + 1
                return (
                  <tr key={i}>
                    <td>
                      <button onClick={(i, e) => this.handleDeleteLine(i)} className="btn btn-danger" id={i}>Delete</button>
                    </td>
                    <td>{lineNumber}</td>
                    <td>{lineItem.weight}</td>
                    <td>{lineItem.pieces}</td>
                    <td>{lineItem.metal}</td>
                    <td>{lineItem.styleNumber}</td>
                    <td>{lineItem.description}</td>
                    <td>{lineItem.labor}</td>
                    <td>{lineItem.laborPC}</td>
                    <td>{lineItem.priceDWT}</td>
                    <td>{lineItem.lineTotal}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="totals">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Gold Balance</label>
                <input
                  type="text"
                  name="goldBalance"
                  onChange={this.onChange}
                  value={this.state.goldBalance}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Fine Gold Used</label>
                <input
                  type="text"
                  name="goldUsed"
                  onChange={this.onChange}
                  value={this.state.goldUsed}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>New Gold Balance</label>
                <input
                  type="text"
                  name="newGoldBalance"
                  onChange={this.onChange}
                  value={this.state.newGoldBalance}
                  className="form-control"
                  readOnly
                />
              </div>
              <button onClick={this.goldClick} className="btn btn-info">Calcuate Gold</button>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Metal Total</label>
                <input
                  type="text"
                  name="metalTotal"
                  onChange={this.metalTotal}
                  value={this.state.metalTotal}
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Labor Total</label>
                <input
                  type="text"
                  name="laborTotal"
                  onChange={this.laborTotal}
                  value={this.state.laborTotal}
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Shipping Total</label>
                <input
                  type="text"
                  name="shippingTotal"
                  onChange={this.shippingTotal}
                  value={this.state.shippingTotal}
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Invoice Total</label>
                <input
                  type="text"
                  name="invoiceTotal"
                  onChange={this.invoiceTotal}
                  value={this.state.invoiceTotal}
                  className="form-control"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        <div className="form-group float-right">
          <input
            type="submit"
            value="Submit"
            className="btn btn-primary"/>
        </div>
      </form>
    </div>
    )
  }
}

export default InvoiceNew
