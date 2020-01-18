import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import './DetailInfoProduct.scss';
import parse from 'html-react-parser';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

class DetailInfoProduct extends Component {
  render() {
    const { className } = this.props;
    const { filters, htmlPage } = this.props.product.product;
    console.log(filters);
    return (
      <div
        className={`detail-info-product ${
          _.isString(className) && className.length > 0 ? className : ''
        }`}
      >
        {_.isArray(filters) && filters.length > 0 && (
          <ExpansionPanel defaultExpanded={true}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant={'h4'}>General characteristics</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Article</TableCell>
                      <TableCell>Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filters.map(item => {
                      const {
                        filter: { _id, type },
                        subFilter: { name }
                      } = item;
                      return (
                        <TableRow key={_id}>
                          <TableCell>{type}</TableCell>
                          <TableCell>{name}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )}

        {_.isString(htmlPage) && htmlPage.length > 0 && (
          <ExpansionPanel defaultExpanded={true}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant={'h4'}>Detailed description</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>{parse(htmlPage)}</ExpansionPanelDetails>
          </ExpansionPanel>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    product: state.product
  };
}

export default connect(mapStateToProps, null)(DetailInfoProduct);
