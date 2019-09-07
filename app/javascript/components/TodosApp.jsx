import registerServiceWorker from '../registerServiceWorker';
import React, { Component } from 'react';
import Todos from './Todos';
import './TodosApp.css';

class TodosApp extends Component {
  constructor(props) {
    super(props);

    const {
      params: { user_id, user_email, user_token, vapid_public_key }
    } = this.props;

    const localStorageData = JSON.stringify({
      authenticated: {
        authenticator: 'authenticator:user',
        userID: user_id,
        userType: 'user',
        identification: user_email,
        token: user_token
      }
    });

    window.localStorage.setItem('pwa-demo:session', `${localStorageData}`);

    registerServiceWorker(vapid_public_key);
  }

  render() {
    return (
      <div className="container">
        <div className="header">
          <h1>Todo List</h1>
        </div>
        <Todos />
      </div>
    );
  }
}

export default TodosApp;
