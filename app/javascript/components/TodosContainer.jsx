import api from 'api/api';
import React, { Component } from 'react';
import './TodosContainer.css';

class TodosContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      inputValue: ''
    };

    this.handleChangeInputChanged = this.handleChangeInputChanged.bind(this);
  }

  getTodos() {
    api.fetchTodos().then(response => {
      this.setState({ todos: response.data });
    });
  }

  createTodo = e => {
    if (e.key === 'Enter' && e.target.value.length > 0) {
      api.createTodo({ title: e.target.value }).then(response => {
        const { todos } = this.state;
        this.setState({
          todos: [response.data, ...todos],
          inputValue: ''
        });
      });
    }
  };

  deleteTodo = id => {
    api.deleteTodo(id).then(response => {
      const { todos } = this.state;
      const todoIndex = todos.findIndex(x => x.id === id);
      this.setState({
        todos: [...todos.slice(0, todoIndex), ...todos.slice(todoIndex + 1)]
      });
    });
  };

  handleChangeInputChanged(event) {
    this.setState({ inputValue: event.target.value });
  }

  toggleTodo(event, id) {
    api.updateTodo(id, { done: event.target.checked }).then(response => {
      const { todos } = this.state;
      const todoIndex = this.state.todos.findIndex(
        x => x.id === response.data.id
      );
      this.setState({
        todos: [
          ...todos.slice(0, todoIndex),
          response.data,
          ...todos.slice(todoIndex + 1)
        ]
      });
    });
  }

  componentDidMount() {
    this.getTodos();
  }

  render() {
    const { inputValue } = this.state;
    return (
      <div>
        <div className="inputContainer">
          <input
            className="taskInput"
            type="text"
            placeholder="Add a task"
            maxLength="50"
            value={inputValue}
            onKeyPress={this.createTodo}
            onChange={this.handleChangeInputChanged}
          />
        </div>
        <div className="listWrapper">
          <ul className="taskList">
            {this.state.todos.map(todo => {
              return (
                <li className="task" todo={todo} key={todo.id}>
                  <input
                    className="taskCheckbox"
                    type="checkbox"
                    checked={todo.done}
                    onChange={e => this.toggleTodo(e, todo.id)}
                  />
                  <label className="taskLabel">{todo.title}</label>
                  <span
                    className="deleteTaskBtn"
                    onClick={e => this.deleteTodo(todo.id)}
                  >
                    x
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default TodosContainer;
