import React, { Component } from 'react';
import TodosContainer from './TodosContainer';
import './TodosApp.css';

class TodosApp extends Component {
  constructor(props) {
    super(props);

    const {
      params: { user_id, user_email, user_token }
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

  }

  render() {
    return (
      <div className="container">
        <div className="header">
          <h1>Todo List</h1>
        </div>
        <TodosContainer />
      </div>
    );
  }
}

export default TodosApp;
