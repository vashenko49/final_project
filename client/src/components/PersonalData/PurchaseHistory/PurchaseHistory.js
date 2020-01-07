import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { Link } from 'react-router-dom';
import Pagination from 'material-ui-flat-pagination';

import OrderAPI from '../../../services/OrderAPI';
import './PurchaseHistory.scss';

class PurchaseHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      limit: 6,
      offset: 0,
      totalDocs: 0,
      page: 1
    };
  }

  componentDidMount() {
    const { limit, page } = this.state;
    OrderAPI.getOrdersByUser({ page, limit }).then(res => {
      const { docs, totalDocs } = res;
      this.setState({ orders: docs, totalDocs });
    });
  }

  handleClickPagination = offset => {
    const { limit } = this.state;
    let page = Math.floor(offset / limit) + 1;
    OrderAPI.getOrdersByUser({ page, limit }).then(res => {
      const { docs, totalDocs, page } = res;
      this.setState({ orders: docs, totalDocs, page, offset });
    });
  };

  getSimpleDate = date => {
    return new Date(date).toISOString().split('T')[0];
  };

  render() {
    const { getSimpleDate, handleClickPagination } = this;
    const { orders, limit, offset, totalDocs } = this.state;
    return (
      <div className="purchase-history-container">
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align={'center'}>Number order</TableCell>
                <TableCell align={'center'}>Date</TableCell>
                <TableCell align={'center'}>Number of goods</TableCell>
                <TableCell align={'center'}>The cost of the order</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map(order => {
                const { _id, orderNo, date, products, totalSum } = order;
                return (
                  <TableRow key={_id}>
                    <TableCell align={'center'}>
                      <Link to={`/order/${_id}`}>{orderNo}</Link>
                    </TableCell>
                    <TableCell align={'center'}>{getSimpleDate(date)}</TableCell>
                    <TableCell align={'center'}>{products.length}</TableCell>
                    <TableCell align={'center'}>{`${totalSum}$`}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          className="purchase-history-paginate"
          limit={limit}
          offset={offset}
          total={totalDocs}
          onClick={(e, offset) => handleClickPagination(offset)}
        />
      </div>
    );
  }
}

export default PurchaseHistory;
