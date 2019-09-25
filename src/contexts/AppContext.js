import React, { Component, createContext } from 'react';
import THEMES from '../constants/themes';
import Storage from '../utils/storage';

export const AppContext = createContext();

export class AppProvider extends Component {
    state = {
        themeIndex: 0,
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

    async componentDidMount(){
        this.storage = new Storage({ localStorage: localStorage });
        this.setState(await this.storage.get(['themeIndex', 'clockSettings']));
    }

    //helper
    async setStateAndStorage(obj){
        this.setState(obj);
        await this.storage.set(obj);
    }

    appOperations = {
        setTheme: (themeIndex) => { this.setStateAndStorage({ themeIndex: themeIndex }) },
        setSidebarOpen: (sidebarOpen) => this.setState({ sidebarOpen }),
        setCalendarModalOpen: (calendarModalOpen) => this.setState({ calendarModalOpen }),
        setClockSettings: (settingsObj) => {
            //TODO: assert settingsObj doesn't have undefined keys
            const newSettings = {...this.state.clockSettings, ...settingsObj};
            this.setStateAndStorage({clockSettings: newSettings});
        }
    }

    render(){
        return (
            <AppContext.Provider value={{
                theme: THEMES[this.state.themeIndex],
                ...this.state,
                ...this.appOperations
            }}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}