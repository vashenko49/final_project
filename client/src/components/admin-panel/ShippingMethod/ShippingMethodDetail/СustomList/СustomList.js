import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import _ from 'lodash';
import './СustomList.scss';
import { Typography } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class CustomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }
  componentDidMount() {
    this.setState({ items: _.isArray(this.props.items) ? this.props.items : [] });
  }

  activateOrDeactivateDeliveryAddress = event => {
    const { activateOrDeactivateDeliveryAddress } = this.props;
    activateOrDeactivateDeliveryAddress({
      idDeliveryAddress: event.target.value,
      status: event.target.checked
    });
  };
  handleToggleAll = event => {
    const { handleToggleAll } = this.props;
    handleToggleAll(event.target.checked);
  };

  handleCheck = event => {
    const { handleCheck } = this.props;
    handleCheck(event.target.checked, event.target.value);
  };

  render() {
    const { activateOrDeactivateDeliveryAddress, handleToggleAll, handleCheck } = this;
    const { items, title, className } = this.props;
    return (
      <Card className={className}>
        <CardHeader
          avatar={
            <Checkbox
              onClick={handleToggleAll}
              checked={
                items.filter(item => item.checked).length === items.length && items.length !== 0
              }
              disabled={items.length === 0}
              inputProps={{ 'aria-label': 'all items selected' }}
            />
          }
          title={title}
          subheader={`${items.filter(item => item.checked).length}/${items.length} selected`}
        />
        <Divider />
        <List className="custom-list" dense component="div" role="list">
          {items.map(item => {
            const { _id, address, checked, enabled } = item;

            return (
              <ListItem key={_id} role="listitem" button>
                <ListItemIcon>
                  <Checkbox
                    onClick={handleCheck}
                    checked={checked}
                    tabIndex={-1}
                    value={_id}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <div>
                      <Typography variant={'body1'}>{address}</Typography>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={activateOrDeactivateDeliveryAddress}
                            checked={enabled}
                            value={_id}
                          />
                        }
                        label="Enabled"
                      />
                    </div>
                  }
                />
              </ListItem>
            );
          })}
          <ListItem />
        </List>
      </Card>
    );
  }
}

CustomList.propTypes = {
  handleToggleAll: PropTypes.func,
  handleCheck: PropTypes.func,
  items: PropTypes.array,
  title: PropTypes.string
};

export default CustomList;
