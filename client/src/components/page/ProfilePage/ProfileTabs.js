import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import {Visibility, VisibilityOff} from '@material-ui/icons';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import './ProfileTabs.scss'

class TabPanel extends Component{
  render() {
    const { children, value, index, ...other } = this.props;

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`wrapped-tabpanel-${index}`}
        aria-labelledby={`wrapped-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={4}>{children}</Box>}
      </Typography>
    );
  }
}

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

export default class ProfileTabs extends Component{
  constructor(props) {
    super(props);
    this.state = {
      tab: "one",
      showCurrentPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
      password: ''
    };
  }

  render() {
    const { tab, showCurrentPassword, showNewPassword, showConfirmPassword, password } = this.state;

    const handleTabChange = (event, newValue) => {
      this.setState({ tab: newValue });
    };

    const handleInputChange = prop => event => {
      this.setState({ [prop]: event.target.value });
    };

    const handleClickShowPassword = prop => event => {
      const prevState = this.state;
      this.setState({ [prop]: !prevState[prop] })
    };

    const handleMouseDownPassword = event => {
      event.preventDefault();
    };

    return (
      <div className="profile-tabs">
        <AppBar className="profile-tabs-bar" position="static">
          <Tabs value={tab} onChange={handleTabChange} aria-label="wrapped label tabs example">
            <Tab
              value="one"
              label="PERSONAL INFORMATION"
              wrapped
              {...a11yProps('one')}
            />
            <Tab value="two" label="CHANGE PASSWORD" {...a11yProps('two')} />
            <Tab value="three" label="PURCHASE HISTORY" {...a11yProps('three')} />
            <Tab value="four" label="FAVOURITES" {...a11yProps('four')} />
          </Tabs>
        </AppBar>
        <TabPanel value={tab} index="one">
          <p className="profile-field-label">First Name</p>
          <TextField id="first-name" className="profile-field" variant='outlined' />
          <p className="profile-field-label">Last Name</p>
          <TextField id="last-name" className="profile-field" variant='outlined' />
          <p className="profile-field-label">Current password</p>
          <TextField id="email-address" className="profile-field" variant='outlined' />
          <Button className="save-btn disabled" variant="contained">Save Changes</Button>
        </TabPanel>
        <TabPanel value={tab} index="two">
          <p className="profile-field-label">Current password</p>
          <OutlinedInput
            id="current-password"
            className="profile-field"
            type={showCurrentPassword ? 'text' : 'password'}
            value={password}
            onChange={handleInputChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword('showCurrentPassword')}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={0}
          />

          <p className="profile-field-label">New Password</p>
          <OutlinedInput
            id="new-password"
            className="profile-field"
            type={showNewPassword ? 'text' : 'password'}
            onChange={handleInputChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword('showNewPassword')}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showNewPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={0}
          />

          <p className="profile-field-label">Confirm new password</p>
          <OutlinedInput
            id="confirm-password"
            className="profile-field"
            type={showConfirmPassword ? 'text' : 'password'}
            onChange={handleInputChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword('showConfirmPassword')}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={0}
          />
          <Button className="save-btn disabled" variant="contained">Save Changes</Button>
        </TabPanel>
        <TabPanel value={tab} index="three">

        </TabPanel>
        <TabPanel value={tab} index="four">

        </TabPanel>
      </div>
    );
  }
}
