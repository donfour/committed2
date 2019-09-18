import React, { Component, createContext } from 'react';
import THEMES from '../constants/themes';

export const AppContext = createContext();

export class AppProvider extends Component {
    state = {
        theme: THEMES[4],
        sidebarOpen: false,
        calendarModalOpen: false,
        clockSettings: {
            showDayOfWeek: true,
            showTime: true,
            showDate: true,
            show24HourClock: true,
            showDayBeforeMonth: false,
            customQuote: null
        }
    }

    appOperations = {
        setTheme: (themeIndex) => this.setState({ theme: THEMES[themeIndex] }),
        setSidebarOpen: (sidebarOpen) => this.setState({ sidebarOpen }),
        setCalendarModalOpen: (calendarModalOpen) => this.setState({ calendarModalOpen }),
        setClockSettings: (settingsObj) => {
            //TODO: assert settingsObj doesn't have undefined keys
            const newSettings = {...this.state.clockSettings, ...settingsObj};
            this.setState({clockSettings: newSettings});
        }
    }

    render(){
        return (
            <AppContext.Provider value={{
                ...this.state,
                ...this.appOperations
            }}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}