import React, { Component } from 'react';
import './TodosApp.css';
import TodosContainer from './TodosContainer';

class TodosApp extends Component {
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
