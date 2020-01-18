import React from 'react';

import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import './SideBarCategoriesMenu.scss';

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    },
    '&$expanded': {
      margin: 'auto'
    }
  },
  expanded: {}
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56
    }
  },
  content: {
    '&$expanded': {
      margin: '12px 0'
    }
  },
  expanded: {}
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(0)
  }
}))(MuiExpansionPanelDetails);

export default function SideBarCategoriesMenu(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <ExpansionPanel
        square
        expanded={expanded === props.rootCategories.name}
        onChange={handleChange(props.rootCategories.name)}
      >
        <ExpansionPanelSummary id={props.rootCategories.name}>
          <Typography>{props.rootCategories.name}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List>
            {props.childCategories
              .filter(elem => elem.parentId === props.rootCategories._id)
              .map(elem => (
                <ListItem key={elem.name} className="sidebar-categories-link">
                  <Link className="sidebar-categories-link-item" onClick={props.toggleDrawer('left', false)} to={{ pathname: `/catalog/${elem._id}` }}>{elem.name}</Link>
                </ListItem>
              ))}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
