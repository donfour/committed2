import React, { Component, createContext } from 'react';
import THEMES from '../constants/themes';
import storage from '../utils/storage';
import { FILTER_OPTIONS } from '../constants/enums';

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
        },
        todoSettings: {
            hideCompleted: false,
            filterByDuedate: FILTER_OPTIONS.SHOW_ALL
        }
    }

    async componentDidMount() {
        this.storage = storage;

        this.setState(await this.storage.get('themeIndex', 'clockSettings', 'todoSettings'));

        storage.on('save', (changes) => {
            console.log('changes in AppContext', changes);
            this.setState(changes);
        })
    }

    appOperations = {
        setTheme: (themeIndex) => {
            this.storage.set({ themeIndex: themeIndex });
        },
        setSidebarOpen: (sidebarOpen) => {
            this.setState({ sidebarOpen });
        },
        setCalendarModalOpen: (calendarModalOpen) => {
            this.setState({ calendarModalOpen });
        },
        setClockSettings: (settingsObj) => {
            //TODO: assert settingsObj doesn't have undefined keys
            const newSettings = { ...this.state.clockSettings, ...settingsObj };
            this.storage.set({ clockSettings: newSettings });
        },
        setTodoSettings: (settingsObj) => {
            //TODO: assert settingsObj doesn't have undefined keys
            const newSettings = { ...this.state.todoSettings, ...settingsObj };
            this.storage.set({ todoSettings: newSettings });
        }
    }

    render() {
        const { showDayOfWeek, showTime, showDate, show24HourClock, showDayBeforeMonth, customQuote } = this.state.clockSettings;
        const { hideCompleted, filterByDuedate } = this.state.todoSettings;
        return (
            <AppContext.Provider value={{
                theme: THEMES[this.state.themeIndex],
                ...this.state,
                ...this.appOperations,
                clockSettings: {
                    showDayOfWeek: {
                        label: 'Show day of week',
                        value: showDayOfWeek
                    },
                    showTime: {
                        label: 'Show time',
                        value: showTime
                    },
                    showDate: {
                        label: 'Show date',
                        value: showDate
                    },
                    show24HourClock: {
                        label: 'Show 24-hour clock',
                        value: show24HourClock
                    },
                    showDayBeforeMonth: {
                        label: 'Show day before month',
                        value: showDayBeforeMonth
                    },
                    customQuote: {
                        label: 'Show custom quote',
                        value: customQuote
                    }
                },
                todoSettings: {
                    hideCompleted: {
                        label: 'Hide completed',
                        value: hideCompleted
                    },
                    filterByDuedate: {
                        label: 'Filter by Duedate',
                        value: filterByDuedate
                    }
                }
            }}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}