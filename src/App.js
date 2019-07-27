// external dependencies
import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Sidebar from "react-sidebar";
// components
import TodoInput from './components/TodoInput';
import TodoList from './containers/TodoList';
import SideMenu from './containers/SideMenu';
import {SettingsIcon} from './components/Icons';
// react contexts
import { withContext } from './context';

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

const App = ({sidebarOpen, setSidebarOpen}) => (
  <Sidebar
    sidebar={<SideMenu/>}
    open={sidebarOpen}
    onSetOpen={setSidebarOpen}
  >
    <div className="App">
      <GlobalStyle />
      <SettingsIcon onClick={()=>setSidebarOpen(true)}/>
      <TodoInput />
      <TodoList />
    </div>
  </Sidebar>
)

export default withContext(App);
