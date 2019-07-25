// module dependencies
import React, { Component } from 'react';
// styles
import './App.css';
// components
import TodoInput from './components/TodoInput';
import TodoList from './containers/TodoList';
// react contexts
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
