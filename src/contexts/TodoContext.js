import React, { Component, createContext } from 'react';

export const TodoContext = createContext();

const DUMMY_STATE = {
    todos: {
        'todo-1': {
            id: 'todo-1',
            listId: 'list-1',
            name: 'A very long todo with a very long todo name A very long todo with a very long todo name A very long todo with a very long todo name A very long todo with a very long todo name',
            link: null,
            dueDate: null,
            completed: false,
            daysOfWeek: [false, false, false, false, false, false, false],
            timeCompleted: null
        },
        'todo-2': {
            id: 'todo-2',
            listId: 'list-1',
            name: '2',
            link: null,
            dueDate: null,
            completed: false,
            daysOfWeek: [false, false, false, false, false, false, false],
            timeCompleted: null
        },
        'todo-3': {
            id: 'todo-3',
            listId: null,
            name: '3',
            link: null,
            dueDate: null,
            completed: false,
            daysOfWeek: [false, false, false, false, false, false, false],
            timeCompleted: null
        }
    },
    lists: {
        'all-todos': {
            id: 'all-todos',
            name: 'Todos',
            todoIds: ['todo-1', 'todo-2']
        },
        'list-1': {
            id: 'list-1',
            name: 'sample list name',
            todoIds: ['todo-3']
        }
    },
    listOrder: ['all-todos', 'list-1'],
    todoBeingEdited: null
}

export class TodoProvider extends Component {
    // state = {
    //     todos: {},
    //     lists: {
    //         'all-todos': {
    //             id: 'all-todos',
    //             title: 'Todos',
    //             todoIds: []
    //         }
    //     },
    //     listOrder: ['all-todos'],
    //     todoBeingEdited: null
    // }

    state = {
        ...DUMMY_STATE
    };

    todosOperations = {
        addTodo: (name = '', listId = 'all-todos') => {
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

            this.setState(newState);
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

            this.setState(newState);
        },
        setTodo: (todoId, newTodoName = '') => {
            const todos = JSON.parse(JSON.stringify(this.state.todos));

            if (!(todoId in todos)) return;

            todos[todoId].name = newTodoName.trim();

            this.setState({ todos });
        },
        setList: (listId, newListName) => {
            const lists = JSON.parse(JSON.stringify(this.state.lists));

            if (!(listId in lists)) return;

            lists[listId].name = newListName;

            this.setState({ lists });
        },
        setTodoCompleted: (todoId, newIsCompleted) => {
            const todos = JSON.parse(JSON.stringify(this.state.todos));

            if (!(todoId in todos)) return;

            todos[todoId].completed = newIsCompleted;
            todos[todoId].timeCompleted = newIsCompleted ? (new Date()).getTime() : null;

            this.setState({ todos });
        },
        toggleTodoDayOfWeek: (todoId, day) => {
            //TODO: assert day is 0 - 6
            const todos = JSON.parse(JSON.stringify(this.state.todos));

            if (!(todoId in todos)) return;

            todos[todoId].daysOfWeek[day] = !todos[todoId].daysOfWeek[day];

            this.setState({ todos });
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

            this.setState(newState);
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

            this.setState(newState);
        },
        setTodoBeingEdited: (todoId) => {
            this.setState({ todoBeingEdited: todoId });
        },
        setTodoDueDate: (dueDate) => {
            const todos = JSON.parse(JSON.stringify(this.state.todos));
            const { todoBeingEdited } = this.state;

            if (!todoBeingEdited || !(todoBeingEdited in todos)) return;

            todos[todoBeingEdited].dueDate = dueDate ? String(dueDate.getTime()) : null;

            this.setState({ todos });
        },
        setTodoLink: (todoId, link) => {
            const todos = JSON.parse(JSON.stringify(this.state.todos));

            if (!(todoId in todos)) return;

            todos[todoId].link = link;

            this.setState({ todos });
        },
        reorderItems: (newListOrder, newLists) => {
            const newState = {};
            if (newListOrder) newState.listOrder = newListOrder;
            if (newLists) newState.lists = newLists;
            this.setState(newState);
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