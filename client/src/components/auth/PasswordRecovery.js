import React, { Component } from 'react';
import axios from 'axios';
class PasswordRecovery extends Component {
  submit = e => {
    e.preventDefault();
    let pas1 = document.getElementById('pas1');
    let pas2 = document.getElementById('pas2');
    let config = {
      headers: {
        Authorization: `Bearer ${decodeURI(this.props.match.params.token)}`
      }
    };
    if (pas1.value === pas2.value) {
      axios
        .put('http://localhost:5000/customers/forgotpassword', { password: pas1.value }, config)
        .then(value => {
          console.log(value);
        });
    }
  };

  // тестовый вариант нужно переделать
  render() {
    return (
      <div>
        <form onSubmit={this.submit}>
          <input id="pas1" type="text" required />
          <input id="pas2" type="text" required />
          <input type="submit" required />
        </form>
      </div>
    );
  }
}

export default PasswordRecovery;
