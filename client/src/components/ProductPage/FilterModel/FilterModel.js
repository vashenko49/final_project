import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import Button from '@material-ui/core/Button';
import './FilterModel.scss';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { bindActionCreators } from 'redux';
import * as ProductAction from '../../../actions/product';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

class FilterModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenCheckOutWindow: false
    };
  }

  triggerCheckOutWindow = () => {
    this.setState({ isOpenCheckOutWindow: !this.state.isOpenCheckOutWindow });
  };

  selectFilter = (e, statusDisable) => {
    if (!statusDisable) {
      const { selectFilter } = this.props;
      const {
        filtersByUser,
        selectedFilter,
        model,
        productUrlImg,
        filterImg
      } = this.props.product.product;
      const { idsubfilter } = e.currentTarget.dataset;
      selectFilter(idsubfilter, filtersByUser, selectedFilter, model, productUrlImg, filterImg);
    }
  };

  render() {
    const { selectFilter, triggerCheckOutWindow } = this;
    const { isOpenCheckOutWindow } = this.state;
    const { className } = this.props;
    const { filtersByUser, fitModelCount } = this.props.product.product;
    const { isAuthorization } = this.props.authorization;
    return (
      <div className={`${_.isString(className) && className.length > 0 ? className : ''}`}>
        {filtersByUser.map(item => {
          const { nameFilter, idFilter, subFilters } = item;
          return (
            <div key={idFilter}>
              <Typography variant={'h6'}>Select {nameFilter}</Typography>
              <div className="container-subfilter">
                {subFilters.map(itemSub => {
                  const { idSubFilter, nameSubFilter, statusSelect, statusDisable } = itemSub;
                  return nameFilter.toLowerCase() === 'color' ? (
                    <Brightness1Icon
                      data-idsubfilter={idSubFilter}
                      className={`icon-choose-color ${statusDisable ? 'select-color-disable' : ''}`}
                      key={idSubFilter}
                      style={{
                        color: nameSubFilter,
                        border: `1px solid ${statusSelect ? nameSubFilter : 'transparent'}`
                      }}
                      onClick={e => {
                        selectFilter(e, statusDisable);
                      }}
                    />
                  ) : (
                    <div
                      data-idsubfilter={idSubFilter}
                      className="subfilter-button"
                      key={idSubFilter}
                      onClick={e => {
                        selectFilter(e, statusDisable);
                      }}
                    >
                      <Button
                        className={`${statusSelect ? 'subfilter-button-selected' : ''} ${
                          statusDisable ? 'select-color-disable' : ''
                        }`}
                        variant="contained"
                        disabled={statusDisable}
                      >
                        {nameSubFilter}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        <div className="service-container">
          <Button
            disabled={fitModelCount !== 1}
            className={`${fitModelCount !== 1 ? '' : 'subfilter-button-selected'} service-button`}
            variant="contained"
            onClick={triggerCheckOutWindow}
          >
            <LocalMallOutlinedIcon /> ADD TO BAG
          </Button>
          {isAuthorization && (
            <Button className="service-button" variant="contained">
              <FavoriteBorderOutlinedIcon /> favourite
            </Button>
          )}
        </div>
        <Dialog
          open={isOpenCheckOutWindow}
          onClose={triggerCheckOutWindow}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>5</DialogContent>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    product: state.product,
    authorization: state.authorization
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectFilter: bindActionCreators(ProductAction.selectFilter, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterModel);
