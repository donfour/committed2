import React, { Component, createContext } from 'react';

export const TodoContext = createContext();

export class TodoProvider extends Component {
    state = {
        todos: [],
        todoBeingEdited: null
    }

    todosOperation = {
        add: (todoName) => {

            const randomId = '_' + Math.random().toString(36).substr(2, 9);

            const newTodo = {
                id: randomId,
                name: todoName,
                daysOfWeek: [false, false, false, false, false, false, false],
                completed: false,
                timeCompleted: null,
                render: true,
                dueDate: null
            }

            const newTodos = this.state.todos.slice();
            newTodos.push(newTodo);

            this.setState({
                todos: newTodos
            })

        },
        setTodo: (todoId, newTodoName) => {

            const { todos } = this.state;

            for (let i = 0; i < todos.length; i++) {
                if (todos[i].id === todoId) {
                    todos[i].name = newTodoName;
                    break;
                }
            }

            this.setState({
                todos
            });

        },
        setCompleted: (todoId, newIsCompleted) => {

            const { todos } = this.state;

            for (let i = 0; i < todos.length; i++) {
                if (todos[i].id === todoId) {
                    todos[i].completed = newIsCompleted;
                    todos[i].timeCompleted = newIsCompleted ? (new Date()).getTime() : null;
                    break;
                }
            }

            this.setState({
                todos
            });

        },
    }

    render(){
        return (
            <TodoContext.Provider value={{
                value: this.state.todos,
                ...this.todosOperation
            }}>
                {this.props.children}
            </TodoContext.Provider>
        )
    }
}

export const withTodoContext = Component => props => (
    <TodoContext.Consumer>
        {todos => <Component {...props} todos={todos} />}
    </TodoContext.Consumer>
);