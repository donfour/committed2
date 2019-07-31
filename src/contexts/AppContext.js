import React, { Component, createContext } from 'react';
import THEMES from '../constants/themes';

export const AppContext = createContext();

export class AppProvider extends Component {
    state = {
        theme: THEMES[0],
        sidebarOpen: false,
        calendarModalOpen: false,
        inputPlaceholderSettings: {
            showDayOfWeek: true,
            showTime: true,
            showDate: true,
            showDayBeforeMonth: false,
            customQuote: null
        }
    }

    appOperations = {
        setTheme: (themeId) => this.setState({ theme: THEMES.find(theme => theme.id === themeId) }),
        setSidebarOpen: (sidebarOpen) => this.setState({ sidebarOpen }),
        setCalendarModalOpen: (calendarModalOpen) => this.setState({ calendarModalOpen }),
        setInputPlaceholderSettings: (settingsObj) => {
            //TODO: assert settingsObj doesn't have undefined keys
            const newSettings = {...this.state.inputPlaceholderSettings, ...settingsObj};
            this.setState({inputPlaceholderSettings: newSettings});
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