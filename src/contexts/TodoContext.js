import React, { Component, createContext } from 'react';
import Storage from '../utils/storage';

export const TodoContext = createContext();

export class TodoProvider extends Component {
    state = {
        todos: {},
        lists: {},
        listOrder: [],
        todoBeingEdited: null
    }

    async componentDidMount(){
        this.storage = new Storage({ localStorage: localStorage });
        this.setState(await this.storage.get(['todos', 'lists', 'listOrder']));
    }

    //helper
    async setStateAndStorage(obj){
        this.setState(obj);
        await this.storage.set(obj);
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

            this.setStateAndStorage(newState);
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

            this.setStateAndStorage(newState);
        },
        setTodo: (todoId, newTodoName = '') => {
            const todos = JSON.parse(JSON.stringify(this.state.todos));

            if (!(todoId in todos)) return;

            todos[todoId].name = newTodoName.trim();

            this.setStateAndStorage({ todos });
        },
        setList: (listId, newListName) => {
            const lists = JSON.parse(JSON.stringify(this.state.lists));

            if (!(listId in lists)) return;

            lists[listId].name = newListName;

            this.setStateAndStorage({ lists });
        },
        setTodoCompleted: (todoId, newIsCompleted) => {
            const todos = JSON.parse(JSON.stringify(this.state.todos));

            if (!(todoId in todos)) return;

            todos[todoId].completed = newIsCompleted;
            todos[todoId].timeCompleted = newIsCompleted ? (new Date()).getTime() : null;

            this.setStateAndStorage({ todos });
        },
        toggleTodoDayOfWeek: (todoId, day) => {
            //TODO: assert day is 0 - 6
            const todos = JSON.parse(JSON.stringify(this.state.todos));

            if (!(todoId in todos)) return;

            todos[todoId].daysOfWeek[day] = !todos[todoId].daysOfWeek[day];

            this.setStateAndStorage({ todos });
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

            this.setStateAndStorage(newState);
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

            this.setStateAndStorage(newState);
        },
        setTodoBeingEdited: (todoId) => {
            this.setState({ todoBeingEdited: todoId });
        },
        setTodoDueDate: (dueDate) => {
            const todos = JSON.parse(JSON.stringify(this.state.todos));
            const { todoBeingEdited } = this.state;

            if (!todoBeingEdited || !(todoBeingEdited in todos)) return;

            todos[todoBeingEdited].dueDate = dueDate ? String(dueDate.getTime()) : null;

            this.setStateAndStorage({ todos });
        },
        setTodoLink: (todoId, link) => {
            const todos = JSON.parse(JSON.stringify(this.state.todos));

            if (!(todoId in todos)) return;

            todos[todoId].link = link;

            this.setStateAndStorage({ todos });
        },
        reorderItems: (newListOrder, newLists) => {
            const newState = {};
            if (newListOrder) newState.listOrder = newListOrder;
            if (newLists) newState.lists = newLists;
            this.setStateAndStorage(newState);
        },
    }

    render() {
        return (
            <TodoContext.Provider value={{
                ...this.state,
                ...this.todosOperations
            }}>
                {this.props.children}
            </TodoContext.Provider>
        )
    }
}