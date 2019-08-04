import React, { Component, createContext } from 'react';

export const TodoContext = createContext();

const DUMMY_STATE = {
    todos: {
        'todo-1': {
            id: 'todo-1',
            listId: 'list-1',
            name: '1',
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
        'list-1': {
            id: 'list-1',
            title: 'sample list name',
            todos: ['todo-1', 'todo-2']
        }
    },
    itemOrder: ['list-1', 'todo-3'],
    todoBeingEdited: null
}

export class TodoProvider extends Component {
    // state = {
    //     todos: {},
    //     lists: {},
    //     itemOrder: [],
    //     todoBeingEdited: null
    // }

    state = {
        ...DUMMY_STATE
    };

    todosOperations = {
        addTodo: (name, listId) => {
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

            if(listId && listId in newState.lists){
                newState.lists[listId].todos.push(id);
            } else {
                newState.itemOrder.push(id);
            }

            this.setState(newState);
        },
        setTodo: (todoId, newTodoName) => {
            const todos = JSON.parse(JSON.stringify(this.state.todos));

            if(!(todoId in todos)) return;

            todos[todoId].name = newTodoName;

            this.setState({ todos });
        },
        setTodoCompleted: (todoId, newIsCompleted) => {
            const todos = JSON.parse(JSON.stringify(this.state.todos));

            if(!(todoId in todos)) return;

            todos[todoId].completed = newIsCompleted;
            todos[todoId].timeCompleted = newIsCompleted ? (new Date()).getTime() : null;

            this.setState({ todos });
        },
        toggleTodoDayOfWeek: (todoId, day) => {
            //TODO: assert day is 0 - 6
            const todos = JSON.parse(JSON.stringify(this.state.todos));

            if(!(todoId in todos)) return;

            todos[todoId].daysOfWeek[day] = !todos[todoId].daysOfWeek[day];

            this.setState({ todos });
        },
        deleteTodo: (todoId) => {
            const newState = JSON.parse(JSON.stringify(this.state));
            const { todos, lists, itemOrder } = newState;

            if(!(todoId in todos)) return;

            delete todos[todoId];

            if(itemOrder.includes(todoId)){
                itemOrder.splice(itemOrder.indexOf(todoId),1);
            }

            for(let listId in lists){
                if(lists[listId].todos.includes(todoId)){
                    lists[listId].todos.splice(lists[listId].todos.indexOf(todoId),1);
                    break;
                }
            }

            this.setState(newState);
        },
        setTodoBeingEdited: (todoId) => {
            this.setState({ todoBeingEdited: todoId });
        },
        setTodoDueDate: (dueDate) => {
            const todos = JSON.parse(JSON.stringify(this.state.todos));
            const { todoBeingEdited } = this.state;

            if(!todoBeingEdited || !(todoBeingEdited in todos)) return;

            todos[todoBeingEdited].dueDate = dueDate ? String(dueDate.getTime()) : null;

            this.setState({ todos });
        },
        setTodoLink: (todoId, link) => {
            const todos = JSON.parse(JSON.stringify(this.state.todos));

            if(!(todoId in todos)) return;

            todos[todoId].link = link;

            this.setState({ todos });
        },
        reorderItems: (newItemOrder, newLists) => {
            const newState = {};
            if(newItemOrder) newState.itemOrder = newItemOrder;
            if(newLists) newState.lists = newLists;
            this.setState(newState);
        },
    }

    render(){
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