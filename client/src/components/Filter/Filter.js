import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormGroup from '@material-ui/core/FormGroup';
import Slider from '@material-ui/core/Slider';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import _ from 'lodash';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import IsColor from 'is-color';

import './Filter.scss';
import Brightness1Icon from '@material-ui/icons/Brightness1';

const PrettoSlider = withStyles({
  root: {
    color: '#FFFFFF',
    height: 8
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#575B65',
    border: '3px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit'
    }
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)'
  },
  track: {
    height: 4,
    marginTop: '2.55px',
    borderRadius: 4
  },
  rail: {
    height: 10,
    borderRadius: 4
  }
})(Slider);

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidPrice: false
    };
  }

  handleChangePrice = (event, newValue) => {
    const { changePrice } = this.props;
    changePrice(newValue);
  };
  handleInputPrice = event => {
    let target = event.target;
    const { changePrice, price } = this.props;
    if (_.isNumber(+target.value) && !_.isNaN(+target.value)) {
      if (target.name === 'minPrice') {
        changePrice([+target.value, price[1]]);
      } else {
        changePrice([price[0], +target.value]);
      }
    }
  };

  handleSubmitPrice = event => {
    event.preventDefault();
    const { priceSubmit } = this.props;
    priceSubmit();
  };

  disableSubmit = condition => {
    if (condition) {
      this.setState({ isValidPrice: false });
      return true;
    } else {
      this.setState({ isValidPrice: true });
      return false;
    }
  };

  componentDidMount() {
    ValidatorForm.addValidationRule('isPrice', value => {
      return this.disableSubmit(_.isNumber(+value) && !_.isNaN(+value));
    });

    ValidatorForm.addValidationRule('isTooMany', async value => {
      const { priceCurrentCatalog } = this.props;
      return this.disableSubmit(+value <= priceCurrentCatalog[1]);
    });

    ValidatorForm.addValidationRule('isTooSmall', async value => {
      const { priceCurrentCatalog } = this.props;
      return this.disableSubmit(+value >= priceCurrentCatalog[0]);
    });

    ValidatorForm.addValidationRule('isSmallerMoreLarge', async value => {
      const { price } = this.props;
      return this.disableSubmit(+value <= price[1]);
    });

    ValidatorForm.addValidationRule('isLargeLessSmaller', async value => {
      const { price } = this.props;
      return this.disableSubmit(+value >= price[0]);
    });
  }

  componentWillUnmount() {
    ValidatorForm.removeValidationRule('isPrice');
    ValidatorForm.removeValidationRule('isTooMany');
    ValidatorForm.removeValidationRule('isTooSmall');
    ValidatorForm.removeValidationRule('isSmallerMoreLarge');
    ValidatorForm.removeValidationRule('isLargeLessSmaller');
  }

  onDeleteTypeFiler = event => {
    const parent = event.currentTarget.parentElement;
    const { subfilter } = parent.dataset;
    const { subfilters } = this.props;
    let index = _.findIndex(subfilters, function(o) {
      return o._id === subfilter;
    });

    this.filterManagement(subfilter, subfilters[index]._idFilter);
  };

  filterManagement = (subfilter, filter) => {
    const { subfilters: chooseSubFilter, filters: allFilters, handleChooseSubFilter } = this.props;
    const indexFilter = _.findIndex(allFilters, function(o) {
      return o.filter._id === filter;
    });

    let indexSubFilter = -1;
    if (indexFilter >= 0) {
      indexSubFilter = _.findIndex(allFilters[indexFilter].subfilters, function(o) {
        return o._id === subfilter;
      });
    }

    let isSubFilter = _.findIndex(chooseSubFilter, function(o) {
      return o._id === subfilter;
    });
    if (isSubFilter >= 0) {
      allFilters[indexFilter].subfilters[indexSubFilter].choose = false;
      chooseSubFilter.splice(isSubFilter, 1);
    } else {
      allFilters[indexFilter].subfilters[indexSubFilter].choose = true;
      chooseSubFilter.push({
        ...allFilters[indexFilter].subfilters[indexSubFilter],
        _idFilter: allFilters[indexFilter].filter._id
      });
    }
    handleChooseSubFilter(chooseSubFilter, allFilters);
  };

  onClickTypeFilter = event => {
    const target = event.currentTarget;
    const { subfilter, filter } = target.dataset;
    this.filterManagement(subfilter, filter);
  };

  clearFilters = () => {
    let { filters, handleChooseSubFilter } = this.props;
    console.log(filters);
    filters = filters.map(filt => {
      return {
        ...filt,
        subfilters: filt.subfilters.map(subf => {
          return {
            ...subf,
            choose: false
          };
        })
      };
    });
    console.log(filters);
    handleChooseSubFilter([], filters);
  };

  render() {
    const {
      handleChangePrice,
      onDeleteTypeFiler,
      handleInputPrice,
      handleSubmitPrice,
      onClickTypeFilter,
      clearFilters
    } = this;
    const { filters, price, priceCurrentCatalog, subfilters } = this.props;
    const { isValidPrice } = this.state;
    return (
      <div className="filters">
        {filters.length <= 0 ? (
          <CircularProgress />
        ) : (
          <div className="filters-container">
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Selected Filters</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className="chooseTypeFilter">
                {subfilters.length > 0 ? (
                  subfilters.map(element => {
                    const { _id, name } = element;
                    const isCol = IsColor(name);
                    return (
                      <Chip
                        key={_id}
                        avatar={
                          isCol ? (
                            <Brightness1Icon
                              className="icon-choose-color"
                              key={_id}
                              style={{
                                color: name,
                                border: `1px solid ${name}`
                              }}
                              onClick={onClickTypeFilter}
                            />
                          ) : null
                        }
                        variant="outlined"
                        size="small"
                        data-subfilter={_id}
                        label={isCol ? '' : name}
                        onDelete={onDeleteTypeFiler}
                        color="primary"
                      />
                    );
                  })
                ) : (
                  <Typography>Filters not yet applied</Typography>
                )}
                {subfilters.length > 0 && (
                  <div className="container-button-clear">
                    <Button
                      onClick={clearFilters}
                      fullWidth
                      variant="contained"
                      color="primary"
                      className="price-filter-submit"
                    >
                      Clear
                    </Button>
                  </div>
                )}
              </ExpansionPanelDetails>
            </ExpansionPanel>
            {price.length > 0 && (
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Price</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div className="price-filter-container">
                    <ValidatorForm
                      ref="form"
                      onSubmit={handleSubmitPrice}
                      onError={errors => console.log(errors)}
                      autoComplete="off"
                    >
                      <TextValidator
                        margin="normal"
                        label="Min Price"
                        onChange={handleInputPrice}
                        name="minPrice"
                        fullWidth
                        value={price[0]}
                        variant="outlined"
                        validators={['isPrice', 'isTooSmall', 'isSmallerMoreLarge']}
                        errorMessages={['Enter correct value', 'Too small number', 'Min more Max']}
                        className="price-filter-input"
                      />
                      <TextValidator
                        margin="normal"
                        label="Max Price"
                        onChange={handleInputPrice}
                        name="maxPrice"
                        fullWidth
                        value={price[1]}
                        variant="outlined"
                        validators={['isPrice', 'isTooMany', 'isLargeLessSmaller']}
                        errorMessages={['Enter correct value', 'Too many number', 'Max less Min']}
                        className="price-filter-input"
                      />
                      <Box mt={2} mb={2}>
                        <Button
                          disabled={isValidPrice}
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          className="price-filter-submit"
                        >
                          OK
                        </Button>
                      </Box>
                    </ValidatorForm>
                    <PrettoSlider
                      min={priceCurrentCatalog[0]}
                      max={priceCurrentCatalog[1]}
                      value={price}
                      onChange={handleChangePrice}
                      aria-labelledby="range-slider"
                      valueLabelDisplay="auto"
                    />
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            )}
            {filters.map(element => {
              const {
                filter: { type, _id },
                subfilters
              } = element;
              return (
                <ExpansionPanel key={_id}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>{type}</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <FormGroup className={type.toLowerCase() === 'color' ? 'filter-color' : ''}>
                      {subfilters.map(typesSub => {
                        const { name, _id: _idSubFilters, choose } = typesSub;
                        return IsColor(name) ? (
                          <Brightness1Icon
                            data-subfilter={_idSubFilters}
                            data-filter={_id}
                            className="icon-choose-color"
                            key={_idSubFilters}
                            style={{
                              color: name,
                              border: `1px solid ${choose ? name : 'transparent'}`
                            }}
                            onClick={onClickTypeFilter}
                          />
                        ) : (
                          <Typography
                            onClick={onClickTypeFilter}
                            className={`filter-type ${choose ? 'filter-type-select' : ''}`}
                            key={_idSubFilters}
                            data-subfilter={_idSubFilters}
                            data-filter={_id}
                            variant="body1"
                          >
                            {name}
                          </Typography>
                        );
                      })}
                    </FormGroup>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

Filter.propTypes = {
  filters: PropTypes.array,
  price: PropTypes.array,
  changePrice: PropTypes.func,
  priceCurrentCatalog: PropTypes.array,
  subfilters: PropTypes.array,
  priceSubmit: PropTypes.func,
  handleChooseSubFilter: PropTypes.func
};

export default Filter;
