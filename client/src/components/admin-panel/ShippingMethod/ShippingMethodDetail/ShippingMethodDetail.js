import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import DeliveryAddressesAPI from '../../../../services/DeliveryAddressesAPI';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import _ from 'lodash';
import cloudinary from 'cloudinary-core';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import CustomList from './СustomList/СustomList';

import './ShippingMethodDetail.scss';
import objectToFormData from 'object-to-formdata';

class ShippingMethodDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isDeliveryAddress: false,
      default: false,
      enabled: false,
      address: [],
      costValue: 0,
      description: '',
      period: '',
      freeShippingOrderSum: 0,
      currency: 'USD',
      imageUrl: '',
      newImgBase64: '',
      activeAddress: []
    };
  }

  onChange = event => {
    this.setState({ [`${event.target.name}`]: event.target.value });
  };

  activateOrDeactivateDeliveryAddress = data => {
    const { setLoad } = this.props;
    setLoad(true);
    DeliveryAddressesAPI.activateOrDeactivateDeliveryAddresses(data).then(() => {
      const { idDeliveryAddress, status } = data;
      this.setState({
        activeAddress: this.state.activeAddress.map(item => {
          if (item._id === idDeliveryAddress) {
            item.enabled = status;
          }
          return item;
        }),
        address: this.state.address.map(item => {
          if (item._id === idDeliveryAddress) {
            item.enabled = status;
          }
          return item;
        })
      });
      setLoad(false);
    });
  };

  handleNewPhoto = event => {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.addEventListener(
      'load',
      () => {
        this.setState({
          newImgBase64: reader.result,
          imageUrl: file
        });
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  componentDidMount() {
    if (_.isObject(this.props.rowData)) {
      this.setState({
        ...this.props.rowData,
        address: this.props.rowData.address.map(item => {
          item.checked = false;
          return item;
        })
      });
    }
    const { getDeliveryAddress } = this;
    getDeliveryAddress();
  }

  getDeliveryAddress = () => {
    const { compareActiveAddress } = this;
    const { setLoad } = this.props;
    setLoad(true);
    DeliveryAddressesAPI.getDeliveryAddresses().then(res => {
      let active = res.map(item => {
        item.checked = false;
        return item;
      });
      let address = this.state.address;
      if (_.isObject(this.props.rowData)) {
        active = res.filter(compareActiveAddress(this.props.rowData.address));

        address = res.filter(compareActiveAddress(active)).map(item => {
          item.checked = false;
          return item;
        });
      }
      this.setState({ activeAddress: active, address: address });
      setLoad(false);
    });
  };

  handleToggleAllTop = status => {
    this.setState({
      address: this.state.address.map(element => {
        element.checked = status;
        return element;
      })
    });
  };

  handleCheckTop = (status, id) => {
    this.setState({
      address: this.state.address.map(element => {
        if (element._id === id) {
          element.checked = status;
        }
        return element;
      })
    });
  };

  handleToggleAllBottom = status => {
    this.setState({
      activeAddress: this.state.activeAddress.map(element => {
        element.checked = status;
        return element;
      })
    });
  };

  handleCheckButton = (status, id) => {
    this.setState({
      activeAddress: this.state.activeAddress.map(element => {
        if (element._id === id) {
          element.checked = status;
        }
        return element;
      })
    });
  };

  moveToUp = () => {
    this.setState({
      activeAddress: this.state.activeAddress.filter(item => {
        return !item.checked;
      }),
      address: this.state.address.concat(
        this.state.activeAddress
          .filter(item => {
            return item.checked;
          })
          .map(item => {
            item.checked = false;
            return item;
          })
      )
    });
  };

  moveToDown = () => {
    this.setState({
      address: this.state.address.filter(item => {
        return !item.checked;
      }),
      activeAddress: this.state.activeAddress.concat(
        this.state.address
          .filter(item => {
            return item.checked;
          })
          .map(item => {
            item.checked = false;
            return item;
          })
      )
    });
  };

  compareActiveAddress = otherArray => {
    return function(current) {
      return (
        otherArray.filter(function(other) {
          return other._id === current._id;
        }).length === 0
      );
    };
  };

  handleCheckBox = event => {
    this.setState({ [`${event.target.value}`]: event.target.checked });
  };

  submit = event => {
    event.preventDefault();
    const { submit } = this.props;

    const options = {
      indices: true,
      nullsAsUndefineds: true
    };

    const newData = _.cloneDeep(this.state);
    delete newData.newImgBase64;
    delete newData.activeAddress;
    delete newData.__v;
    delete newData._id;

    newData.address = newData.address.map(element => {
      return element._id;
    });

    if (_.isObject(this.props.rowData)) {
      newData.idShippingMethod = this.props.rowData._id;
    }

    const formData = objectToFormData(newData, options);
    submit(formData);
  };

  render() {
    const {
      onChange,
      handleNewPhoto,
      handleCheckBox,
      activateOrDeactivateDeliveryAddress,
      handleToggleAllTop,
      handleToggleAllBottom,
      handleCheckTop,
      handleCheckButton,
      moveToUp,
      moveToDown,
      submit
    } = this;
    const {
      name,
      isDeliveryAddress,
      default: defaultStatus,
      enabled,
      address,
      costValue,
      description,
      period,
      freeShippingOrderSum,
      imageUrl,
      newImgBase64,
      activeAddress
    } = this.state;
    const { load } = this.props;
    const { cloudinary_cloud_name } = this.props.configuration;
    return (
      <Container>
        <ValidatorForm ref="form" onSubmit={submit}>
          <TextValidator
            margin="normal"
            label="Title method"
            onChange={onChange}
            name="name"
            fullWidth
            value={name}
            variant="outlined"
            validators={['required']}
            errorMessages={['This field is required']}
            disabled={load}
          />
          <TextValidator
            margin="normal"
            label="Description method"
            onChange={onChange}
            name="description"
            fullWidth
            value={description}
            variant="outlined"
            validators={['required']}
            errorMessages={['This field is required']}
            disabled={load}
          />
          <TextValidator
            margin="normal"
            label="Period delivery"
            onChange={onChange}
            name="period"
            fullWidth
            value={period}
            variant="outlined"
            validators={['required']}
            errorMessages={['This field is required']}
            disabled={load}
          />
          <TextValidator
            margin="normal"
            label="Cost value"
            onChange={onChange}
            type={'number'}
            name="costValue"
            fullWidth
            value={costValue}
            variant="outlined"
            validators={['required']}
            errorMessages={['This field is required']}
            disabled={load}
          />
          <TextValidator
            margin="normal"
            label="Free shipping order sum over"
            onChange={onChange}
            type={'number'}
            name="freeShippingOrderSum"
            fullWidth
            value={freeShippingOrderSum}
            variant="outlined"
            validators={['required']}
            errorMessages={['This field is required']}
            disabled={load}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={enabled}
                onChange={handleCheckBox}
                value="enabled"
                disabled={load}
              />
            }
            label="Enabled"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={defaultStatus}
                onChange={handleCheckBox}
                value="default"
                disabled={load}
              />
            }
            label="Default"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isDeliveryAddress}
                onChange={handleCheckBox}
                value="isDeliveryAddress"
                disabled={load}
              />
            }
            label="Express delivery"
          />
          <div className="container-img">
            {((_.isString(imageUrl) && imageUrl.length > 0) || newImgBase64.length > 0) && (
              <img
                className="payment-logo"
                src={
                  newImgBase64.length > 0
                    ? newImgBase64
                    : new cloudinary.Cloudinary({
                        cloud_name: cloudinary_cloud_name
                      }).url(imageUrl)
                }
                alt={'Not found'}
              />
            )}
            <div className="change-avatar">
              <input
                className="upload-avatar"
                onChange={handleNewPhoto}
                accept="image/*"
                id="raised-button-file"
                type="file"
                disabled={load}
              />
              <label htmlFor="raised-button-file">
                <Button disabled={load} component="span">
                  {_.isString(imageUrl) && imageUrl.length > 0 ? 'Change logo' : 'Upload Logo'}
                </Button>
              </label>
            </div>
          </div>
          <div className="transfer-list-container-shipping-method">
            <CustomList
              className="transfer-list-custom"
              items={address}
              title="custom"
              activateOrDeactivateDeliveryAddress={activateOrDeactivateDeliveryAddress}
              handleCheck={handleCheckTop}
              handleToggleAll={handleToggleAllTop}
            />
            <div className="transfer-list-btn-container-shipping-method">
              <Button
                variant="outlined"
                size="small"
                onClick={moveToUp}
                className="transfer-list-btn"
                disabled={activeAddress.filter(item => item.checked).length === 0 || load}
                aria-label="move selected left"
              >
                &#8593;
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={moveToDown}
                className="transfer-list-btn"
                disabled={address.filter(item => item.checked).length === 0 || load}
                aria-label="move selected right"
              >
                &#8595;
              </Button>
            </div>
            <CustomList
              className="transfer-list-custom"
              items={activeAddress}
              title="custom"
              handleCheck={handleCheckButton}
              handleToggleAll={handleToggleAllBottom}
              activateOrDeactivateDeliveryAddress={activateOrDeactivateDeliveryAddress}
            />
          </div>
          <div className="position-btn-submit">
            <Button type="submit" disabled={load} variant="contained" color="primary">
              {_.isObject(this.props.rowData) ? 'Save Changes' : 'Create'}
            </Button>
          </div>
        </ValidatorForm>
      </Container>
    );
  }
}

ShippingMethodDetail.propTypes = {
  load: PropTypes.bool,
  submit: PropTypes.func
};

function mapStateToProps(state) {
  return { configuration: state.configuration };
}

export default connect(mapStateToProps, null)(ShippingMethodDetail);
