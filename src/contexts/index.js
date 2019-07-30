import React from 'react';
import { TodoContext, TodoProvider } from './TodoContext';
import { AppContext, AppProvider } from './AppContext';

export const ContextProvider = (props) => (
    <AppProvider>
        <TodoProvider>
            {props.children}
        </TodoProvider>
    </AppProvider>
)

export const withContext = Component => props => (
    <AppContext.Consumer>
      {appContext => (
        <TodoContext.Consumer>
          {todoContext => (
            <Component {...props} {...todoContext} {...appContext}/>
          )}
        </TodoContext.Consumer>
      )}
    </AppContext.Consumer>
);