import React, { Component } from 'react';
import { Container, Typography, Box } from '@material-ui/core';
import { connect } from 'react-redux';

class AdminPanelWelcome extends Component {
  render() {
    const {
      personalInfo: { firstName }
    } = this.props.authorization;
    return (
      <Container>
        <Box mt={4}>
          <Typography align={'center'} variant={'h2'}>
            {`Welcome, ${firstName}, to the administration panel`}
          </Typography>
        </Box>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    authorization: state.authorization
  };
}

export default connect(mapStateToProps, null)(AdminPanelWelcome);
