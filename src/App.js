import React, { Component } from 'react';
import './App.css';
import TodoInput from './components/TodoInput/TodoInput';
import TodoList from './containers/TodoList';
import { TodoProvider } from './context/TodoContext';

export default class App extends Component {
  
  state = {
    calendarIsOpened: false,
    todoBeingEdited: -1
  }

  app = {
    getCalendarIsOpened: () => this.state.calendarIsOpened,
    setCalendarIsOpened: (calendarIsOpened) => this.setState({ calendarIsOpened })
  }

  render(){
    return (
      <TodoProvider>
        <div className="App">
          <TodoInput/>
          <TodoList/>
        </div>
      </TodoProvider>
    );
  }
}
