import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AdminFooterAPI from '../../../services/AdminFooterAPI';

import FooterDetailForm from './FooterDetailForm.js';

import SnackBars from '../../common/admin-panel/SnackBars';
import Preloader from '../../common/admin-panel/Preloader';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    padding: theme.spacing(2)
  }
});

class FooterDetail extends Component {
  state = {
    groupLink: '',
    links: [],
    typeForm: 'create',
    idUpdate: null,
    sendDataStatus: 'success',
    sendDataMessage: '',
    isLoading: false
  };

  setIsLoading = state => {
    this.setState({ isLoading: state });
  };

  newObjLink = () => ({
    id: new Date().getTime().toString(),
    description: '',
    htmlPage: ''
  });

  onChangeValue = (name, val, idLink) => {
    const { links } = this.state;

    if (name === 'description' || name === 'htmlPage') {
      this.setState({
        links: links.map(i => (i.id === idLink ? { ...i, [name]: val } : i))
      });
    } else {
      this.setState({ [name]: val });
    }
  };

  onAddLink = () => {
    this.setState({
      links: [...this.state.links, this.newObjLink()]
    });
  };

  onClickDelete = e => {
    e.stopPropagation();

    this.setState({
      links: this.state.links.filter(i => i.id !== e.currentTarget.getAttribute('datakey'))
    });
  };

  onSubmitForm = async () => {
    try {
      this.setIsLoading(true);

      const { groupLink, links, idUpdate, typeForm } = this.state;

      const sendData = {
        title: groupLink,
        enabled: true,
        links: links.map(i => ({
          enabled: true,
          description: i.description,
          customId: i.description.toLowerCase().replace(/\W|\d/gi, '_'),
          url: `/links/content/${i.description.toLowerCase().replace(/\W|\d/gi, '_')}`,
          htmlContent: i.htmlPage
        }))
      };

      if (typeForm === 'create') {
        await AdminFooterAPI.createFooter(sendData);
      }
      if (typeForm === 'update') {
        await AdminFooterAPI.updateFooter(idUpdate, sendData);
      }

      this.setIsLoading(false);

      this.setState({
        sendDataStatus: 'success',
        sendDataMessage: `${groupLink} link has been ${typeForm}!`
      });
    } catch (err) {
      this.setIsLoading(false);

      this.setState({
        sendDataStatus: 'error',
        sendDataMessage: err.response.data.message
      });
    }
  };

  handleCloseSnackBars = (event, reason) => {
    if (reason === 'clickaway') return;

    this.setState({ sendDataMessage: '' });
  };

  async componentDidMount() {
    try {
      this.setIsLoading(true);

      const { id } = this.props.match.params;
      if (id) {
        this.setState({ typeForm: 'update', idUpdate: id });

        const { data } = await AdminFooterAPI.getFooterById(id);

        this.setState({
          groupLink: data.title,
          links: data.links.map(i => ({
            id: i._id,
            description: i.description,
            htmlPage: i.htmlContent
          }))
        });
      } else {
        this.setState({ links: [this.newObjLink()] });
      }

      this.setIsLoading(false);
    } catch (err) {
      this.setIsLoading(false);

      this.setState({
        sendDataStatus: 'error',
        sendDataMessage: err.response.data.message
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { groupLink, links, sendDataStatus, sendDataMessage, isLoading } = this.state;

    return (
      <Container maxWidth="md">
        <Paper className={classes.root}>
          <Button
            onClick={() => this.props.history.goBack()}
            startIcon={<ArrowBackIcon color="action" />}
          >
            <Typography component="span">
              <Box fontWeight={500} component="span" fontFamily="Monospace" fontSize="h7.fontSize">
                Footer
              </Box>
            </Typography>
          </Button>
          <FooterDetailForm
            groupLink={groupLink}
            links={links}
            onChangeValue={this.onChangeValue}
            onClickDelete={this.onClickDelete}
            onAddLink={this.onAddLink}
            onSubmitForm={this.onSubmitForm}
            onSubmitFormDisabled={
              !!(links.find(i => !i.description || !i.htmlPage.length) || !groupLink)
            }
          />

          <SnackBars
            handleClose={this.handleCloseSnackBars}
            variant={sendDataStatus}
            open={!!sendDataMessage}
            message={sendDataMessage}
          />

          <Preloader open={isLoading} />
        </Paper>
      </Container>
    );
  }
}

FooterDetail.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FooterDetail);
