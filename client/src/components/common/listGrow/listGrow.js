import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

import './listGrow.scss';

class ListGrow extends Component {
  constructor(props) {
    super(props);
    const { menuItem } = props;
    this.state = {
      currentChoose: menuItem[0],
      anchorRef: null,
      open: false
    };
  }

  handleToggle = event => {
    const { open, anchorRef } = this.state;
    this.setState({
      open: !open,
      anchorRef: anchorRef ? null : event.currentTarget
    });
  };
  handleClose = event => {
    this.setState({ open: false, anchorRef: null });
  };
  handleChoose = event => {
    const { index } = event.currentTarget.dataset;
    const { changePropsParent, isCurrentData, menuItem } = this.props;
    if (index) {
      changePropsParent(!isCurrentData ? index : menuItem[+index]);
      this.setState({ open: false, anchorRef: null, currentChoose: menuItem[+index] });
    }
  };

  handleListKeyDown = event => {
    if (event.key === 'Tab') {
      event.preventDefault();
      this.setState({ open: false, anchorRef: null });
    }
  };

  render() {
    const { handleToggle, handleClose, handleListKeyDown, handleChoose } = this;
    const { open, anchorRef, currentChoose } = this.state;
    const { menuItem, title, isCurrentData, titleButton } = this.props;
    return (
      <div className="listGrow">
        <Typography variant={'h6'}>{title}</Typography>
        <div>
          <Button
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            {isCurrentData ? currentChoose : titleButton}
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef}
            role={undefined}
            placement="bottom-end"
            transition
            disablePortal
            className="popover-filter-by"
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  {menuItem.map((element, index) => {
                    return (
                      <MenuItem data-index={index} key={element} onClick={handleChoose}>
                        {element}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Popper>
        </div>
      </div>
    );
  }
}

ListGrow.propTypes = {
  title: PropTypes.string,
  menuItem: PropTypes.array,
  isCurrentData: PropTypes.bool,
  changePropsParent: PropTypes.func
};

export default ListGrow;
