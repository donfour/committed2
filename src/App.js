// external dependencies
import React from 'react';
import Sidebar from "react-sidebar";
// components
import { GlobalStyle } from './App.style';
import SideMenu from './containers/SideMenu';
import TodoList from './containers/TodoList';
import TodoInput from './components/TodoInput';
import CalendarModal from './components/CalendarModal';
import { SettingsIcon } from './components/Icons';
// react contexts
import { withContext } from './contexts';

const App = ({
  sidebarOpen, setSidebarOpen,
  calendarModalOpen, setCalendarModalOpen, setTodoDueDate,
  theme
}) => (
  <Sidebar
    sidebar={<SideMenu/>}
    open={sidebarOpen}
    onSetOpen={setSidebarOpen}
  >
    
    <div className="App">
      
      <GlobalStyle theme={theme}/>
      
      <SettingsIcon theme={theme} onClick={()=>setSidebarOpen(true)}/>

      {/* Modals */}
      <CalendarModal
        isOpen={calendarModalOpen}
        onDayClick={setTodoDueDate}
        handleCloseModal={() => setCalendarModalOpen(false)}
      />

      {/* Main app */}
      <TodoInput />
      <TodoList />

    </div>

  </Sidebar>
)

export default withContext(App);
