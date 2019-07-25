// external dependencies
import React, { Component } from 'react';
import { createGlobalStyle } from 'styled-components';
// components
import TodoInput from './components/TodoInput';
import TodoList from './containers/TodoList';
// react contexts
import { TodoProvider } from './context/TodoContext';

const GlobalStyle = createGlobalStyle`
  html, body, #root, .App{
    height: 100%;
  }

  *{
    font-family: 'Lato', sans-serif;
  }

  .App{
    margin: auto;
    width: 700px;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;


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
        <GlobalStyle/>
        <div className="App">
          <TodoInput/>
          <TodoList/>
        </div>
      </TodoProvider>
    );
  }
}
