import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

class TableInvoiceRow extends Component {
  constructor(props) {
    super(props)
    this.delete = this.delete.bind(this)
  }
  delete() {
    console.log(this.props)
    const { obj } = this.props
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure? This cannot be undone.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            axios.get(`/api/invoice/delete/${obj._id}`, obj)
              .then((obj) => this.props.history.push('/invoice'))
              .catch(err => console.log(err))
          }
        },
        {
          label: 'No',
          onClick: () => console.log('no delete')
        }
      ]
    })
  }

  componentDidMount() {
    axios.get('/api/invoice')
      .then(res => {
        this.setState({ invoice: res.data })
      })
  }

  componentDidUpdate() {
    axios.get('/api/invoice')
      .then(res => {
        this.setState({ invoice: res.data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const { invoiceNumber, createdAt, custCode, dueDate, status } = this.props.obj
    return (
        <tr>
          <td>
            {invoiceNumber}
          </td>
          <td>
            {custCode}
          </td>
          <td>
            {moment(createdAt).format('lll')}
          </td>
          <td>
            {moment(dueDate).format('lll')}
          </td>
          <td>
            {status}
          </td>
          <td>
            <Link to={`/edit/${this.props.obj._id}`} className="btn btn-primary mr-2">Edit</Link>
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
          </td>
        </tr>
    );
  }
}

export default TableInvoiceRow
