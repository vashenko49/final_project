import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Slider from '@material-ui/core/Slider';
import CircularProgress from '@material-ui/core/CircularProgress';

import './Filter.scss';

class Filter extends Component {
  handleChangePrice = (event, newValue) => {
    const { changePrice } = this.props;
    changePrice(newValue);
  };

  render() {
    const { handleChangePrice } = this;
    const { filters, price, priceCurrentCatalog } = this.props;

    return (
      <div className="filters">
        {filters.length <= 0 ? (
          <CircularProgress />
        ) : (
          <div className="filters-container">
            {price.length > 0 && (
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Price</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Slider
                    min={priceCurrentCatalog[0]}
                    max={priceCurrentCatalog[1]}
                    value={price}
                    onChange={handleChangePrice}
                    aria-labelledby="range-slider"
                    valueLabelDisplay="auto"
                  />
                </ExpansionPanelDetails>
              </ExpansionPanel>
            )}

            {filters.map(element => {
              const {
                _id,
                filter: { type },
                subfilters
              } = element;
              console.log(subfilters);
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
                    <FormGroup>
                      {subfilters.map(typesSub => {
                        const { name, _id } = typesSub;
                        return (
                          <FormControlLabel
                            key={_id}
                            data-subfilter={_id}
                            value="start"
                            control={<Checkbox color="primary" />}
                            label={name}
                            labelPlacement="start"
                          />
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
  changePrice: PropTypes.func
};

export default Filter;
