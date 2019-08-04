// external dependencies
import React from 'react';
import Sidebar from "react-sidebar";
// components
import { GlobalStyle } from './App.style';
import SideMenu from './containers/SideMenu';
import ItemsContainer from './containers/ItemsContainer';
import { SettingsIcon } from './components/Icons';
import TodoInput from './components/TodoInput';
import CalendarModal from './components/CalendarModal';
// react contexts
import { withContext } from './contexts';

const App = ({
  sidebarOpen, setSidebarOpen,
  calendarModalOpen, setCalendarModalOpen, setTodoDueDate,
  theme
}) => (
  <Sidebar
    sidebar={<SideMenu open={sidebarOpen}/>}
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
      <ItemsContainer />

    </div>

  </Sidebar>
)

export default withContext(App);
