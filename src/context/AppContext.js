import React, { Component, createContext } from 'react';
import THEMES from '../themes';

export const AppContext = createContext();

export class AppProvider extends Component {
    state = {
        theme: THEMES[0]
    }

    appOperations = {
        setTheme: (themeNumber) => this.setState({ theme: THEMES[themeNumber] })
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