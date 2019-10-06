// external dependencies
import React from 'react';
import Sidebar from "react-sidebar";
// components
import { GlobalStyle } from './App.style';
import SideMenu from './containers/SideMenu';
import ItemsContainer from './containers/ItemsContainer';
import { SettingsIcon } from './components/Icons';
import Clock from './components/Clock';
import CalendarModal from './components/CalendarModal';
// store
import { withStore } from './store';

const App = ({
  sidebarOpen, setSidebarOpen,
  calendarModalOpen, setCalendarModalOpen, setTodoDueDate,
  theme
}) => (
    <Sidebar
      sidebar={
        <SideMenu
          open={sidebarOpen}
          checkboxStyles={{
            checkboxColor: theme.checkbox.background,
            tickColor: theme.checkbox.tick,
          }}
        />
      }
      open={sidebarOpen}
      onSetOpen={setSidebarOpen}
    >

      <div className="App">

        <GlobalStyle backgroundColor={theme.background} />

        <SettingsIcon
          defaultIconColor={theme.icon.default}
          hoverIconColor={theme.icon.hover}
          onClick={() => setSidebarOpen(true)}
        />

        {/* Modals */}
        <CalendarModal
          overlayColor='rgba(0,0,0,0.7)'
          buttonColor={theme.secondary}
          fontColor={theme.background}
          isOpen={calendarModalOpen}
          onDayClick={setTodoDueDate}
          handleCloseModal={() => setCalendarModalOpen(false)}
        />

        {/* Main app */}
        <Clock/>
        <ItemsContainer />

      </div>

    </Sidebar>
  )

export default withStore(App);
