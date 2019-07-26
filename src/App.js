// external dependencies
import React, { Component } from 'react';
import { createGlobalStyle } from 'styled-components';
// components
import TodoInput from './components/TodoInput';
import TodoList from './containers/TodoList';
// react contexts
import { ContextProvider } from './context';

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

const App = () => (
  <ContextProvider>
    <GlobalStyle />
    <div className="App">
      <TodoInput />
      <TodoList />
    </div>
  </ContextProvider>
)

export default App;
