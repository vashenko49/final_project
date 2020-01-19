import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Routes from './components/routing/Routes';

import { configureStore } from './store';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import './font/Varta/Varta-font.css';
import './font/Proxima_Nova/Proxima_Nova-font.css';
import './font/Roboto/Roboto-font.css';

import './App.scss';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Header />
          <Switch>
            <Routes />
          </Switch>
          <Footer />
        </Router>
      </Provider>
    );
  }
}

export default App;
