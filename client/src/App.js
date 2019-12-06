import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import ProductPageF from './components/page/ProductPageF';

import './font/Varta/Varta-font.css';
import './font/Proxima_Nova/Proxima_Nova-font.css';
import './font/Roboto/Roboto-font.css';

import './App.scss';
import Authorization from './components/Authorization/Authorization';
import PasswordRecovery from './components/Authorization/PasswordRecovery/PasswordRecovery';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/authorization" component={Authorization} />
            <Route exact exect path="/product/:id" component={ProductPageF} />
            <Route exact exect path="/passwordrecovery/:token" component={PasswordRecovery} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
