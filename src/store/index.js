import React, { Component, createContext } from 'react';
import StorageFactory from '../utils/storage';
import { FILTER_OPTIONS, STORAGE } from '../constants/enums';
import THEMES from '../constants/themes';

export const StoreContext = createContext();

const DEFAULT_TODO_STATE = {
  todos: {},
  lists: {},
  listOrder: [],
  todoBeingEdited: null,
};

export class StoreProvider extends Component {
  state = {
    //Todos
    ...DEFAULT_TODO_STATE,
    //App settings
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
    },
    storage: STORAGE.LOCAL,
  }

  //helpers
  uncheckRecurringTodos() {
    const { todos } = this.state;

    for (let todoId in todos) {
      const todo = todos[todoId];

      const isRecurring = todo.daysOfWeek.includes(true)

      const dayCompleted = todo.timeCompleted && (new Date(todo.timeCompleted)).getDate();

      const dayToday = (new Date()).getDate();

      if (todo.completed && isRecurring && (dayCompleted && dayCompleted !== dayToday)) {
        this.todosOperations.setTodoCompleted(todoId, false);
      }
    }
  }

  initializeStorage() {
    // storage is always stored in localStorage
    const storageName = StorageFactory.getStorage(STORAGE.LOCAL).get('storage').storage;
    this.appOperations.setStorage(storageName || STORAGE.LOCAL);
  }

  async componentDidMount() {
    this.initializeStorage();

    this.uncheckRecurringTodos();

    setInterval(this.uncheckRecurringTodos.bind(this), 1000);
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
    },
    setStorage: async (storageName) => {
      if (storageName !== STORAGE.LOCAL && storageName !== STORAGE.CHROME) throw new Error('storage can only be local or chrome, but got:', storageName);
      if (this.storage && storageName === this.state.storage) return;

      // storage is always stored in localStorage
      const localStorage = StorageFactory.getStorage('local');
      localStorage.set({ storage: storageName });

      switch (storageName) {
        case 'local':
          this.storage = localStorage;
          break;
        case 'chrome':
          this.storage = StorageFactory.getStorage('chrome');
          break;
      }

      this.setState({
        ...DEFAULT_TODO_STATE,
        storage: storageName,
        ...await this.storage.get(
          'todos',
          'lists',
          'listOrder',
          'themeIndex',
          'clockSettings',
          'todoSettings'
        )
      });

      this.storage.on('save', (changes) => {
        console.log('changes in store', changes);
        this.setState(changes);
      });
    }
  }

  todosOperations = {
    addTodo: (name = '', listId) => {
      const newState = JSON.parse(JSON.stringify(this.state));

      const id = '_' + Math.random().toString(36).substr(2, 9);

      const newTodo = {
        id,
        listId,
        name,
        link: null,
        dueDate: null,
        completed: false,
        daysOfWeek: [false, false, false, false, false, false, false],
        timeCompleted: null
      }

      newState.todos[id] = newTodo;

      if (listId && listId in newState.lists) {
        newState.lists[listId].todoIds.push(id);
      } else {
        newState.listOrder.push(id);
      }
      //TODO: not save the whole state (e.g. no need todoBeingEdited)
      this.storage.set(newState);
    },
    addList: () => {
      const newState = JSON.parse(JSON.stringify(this.state));

      const id = '_' + Math.random().toString(36).substr(2, 9);

      const newList = {
        id,
        name: '',
        todoIds: []
      }

      newState.lists[id] = newList;


      newState.listOrder.push(id);

      this.storage.set(newState);
    },
    setTodo: (todoId, newTodoName = '') => {
      const todos = JSON.parse(JSON.stringify(this.state.todos));

      if (!(todoId in todos)) return;

      todos[todoId].name = newTodoName.trim();

      this.storage.set({ todos });
    },
    setList: (listId, newListName) => {
      const lists = JSON.parse(JSON.stringify(this.state.lists));

      if (!(listId in lists)) return;

      lists[listId].name = newListName;

      this.storage.set({ lists });
    },
    setTodoCompleted: (todoId, completed) => {
      const todos = JSON.parse(JSON.stringify(this.state.todos));

      if (!(todoId in todos)) return;

      todos[todoId].completed = completed;
      todos[todoId].timeCompleted = completed ? (new Date()).getTime() : null;

      this.storage.set({ todos });
    },
    toggleTodoDayOfWeek: (todoId, day) => {
      //TODO: assert day is 0 - 6
      const todos = JSON.parse(JSON.stringify(this.state.todos));

      if (!(todoId in todos)) return;

      todos[todoId].daysOfWeek[day] = !todos[todoId].daysOfWeek[day];

      this.storage.set({ todos });
    },
    deleteTodo: (todoId) => {
      const newState = JSON.parse(JSON.stringify(this.state));
      const { todos, lists, listOrder } = newState;

      if (!(todoId in todos)) return;

      delete todos[todoId];

      if (listOrder.includes(todoId)) {
        listOrder.splice(listOrder.indexOf(todoId), 1);
      }

      for (let listId in lists) {
        if (lists[listId].todoIds.includes(todoId)) {
          lists[listId].todoIds.splice(lists[listId].todoIds.indexOf(todoId), 1);
          break;
        }
      }

      this.storage.set(newState);
    },
    deleteList: (listId) => {
      const newState = JSON.parse(JSON.stringify(this.state));
      const { todos, lists, listOrder } = newState;

      if (!(listId in lists)) return;

      lists[listId].todoIds.forEach(todoId => delete todos[todoId]);

      delete lists[listId];

      if (listOrder.includes(listId)) {
        listOrder.splice(listOrder.indexOf(listId), 1);
      }

      this.storage.set(newState);
    },
    setTodoBeingEdited: (todoId) => {
      this.setState({ todoBeingEdited: todoId });
    },
    setTodoDueDate: (dueDate) => {
      const todos = JSON.parse(JSON.stringify(this.state.todos));
      const { todoBeingEdited } = this.state;

      if (!todoBeingEdited || !(todoBeingEdited in todos)) return;

      todos[todoBeingEdited].dueDate = dueDate ? String(dueDate.getTime()) : null;

      this.storage.set({ todos });
    },
    setTodoLink: (todoId, link) => {
      const todos = JSON.parse(JSON.stringify(this.state.todos));

      if (!(todoId in todos)) return;

      todos[todoId].link = link;

      this.storage.set({ todos });
    },
    reorderItems: (newListOrder, newLists) => {
      const newState = {};
      if (newListOrder) newState.listOrder = newListOrder;
      if (newLists) newState.lists = newLists;
      this.storage.set(newState);
    },
  }

  render() {
    const { showDayOfWeek, showTime, showDate, show24HourClock, showDayBeforeMonth, customQuote } = this.state.clockSettings;
    const { hideCompleted, filterByDuedate } = this.state.todoSettings;

    return (
      <StoreContext.Provider value={{
        theme: THEMES[this.state.themeIndex],
        ...this.state,
        ...this.todosOperations,
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
      </StoreContext.Provider>
    )
  }

}

export const withStore = Component => props => (
  <StoreContext.Consumer>
    {storeContext => (
      <Component {...props} {...storeContext} />
    )}
  </StoreContext.Consumer>
);