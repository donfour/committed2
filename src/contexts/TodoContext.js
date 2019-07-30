import React, { Component, createContext } from 'react';

export const TodoContext = createContext();

export class TodoProvider extends Component {
    state = {
        todos: [],
        todoBeingEdited: null
    }

    todosOperations = {
        addTodo: (todoName) => {
            const randomId = '_' + Math.random().toString(36).substr(2, 9);

            const newTodo = {
                id: randomId,
                name: todoName,
                link: null,
                dueDate: null,
                completed: false,
                /* indicates if todo is set on repeat on specific days of week */
                daysOfWeek: [false, false, false, false, false, false, false],
                timeCompleted: null
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
        setTodos: (newTodoArray) => {
            //TODO: assert todo array is of right structure
            this.setState({ todos: newTodoArray });
        },
        setTodoCompleted: (todoId, newIsCompleted) => {
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
        toggleTodoDayOfWeek: (todoId, day) => {
            //TODO: assert day is 0 - 6
            const { todos } = this.state;

            for (let i = 0; i < todos.length; i++) {
                if (todos[i].id === todoId) {
                    todos[i].daysOfWeek[day] = !todos[i].daysOfWeek[day];
                    break;
                }
            }

            this.setState({
                todos
            });
        },
        deleteTodo: (todoId) => {
            const { todos } = this.state;

            for(let i=0; i<todos.length; i++){
                if(todos[i].id === todoId){
                  todos.splice(i,1);
                  break;
                }
            }

            this.setState({
                todos
            });
        },
        setTodoBeingEdited: (todoId) => {
            this.setState({ todoBeingEdited: todoId });
        },
        setTodoDueDate: (dueDate) => {
            const { todos, todoBeingEdited } = this.state;

            for (let i = 0; i < todos.length; i++) {
                if (todos[i].id === todoBeingEdited) {
                    todos[i].dueDate = dueDate ? String(dueDate.getTime()) : null;
                    break;
                }
            }

            this.setState({
                todos
            });
        },
        setTodoLink: (todoId, link) => {
            const { todos } = this.state;

            for (let i = 0; i < todos.length; i++) {
                if (todos[i].id === todoId) {
                    todos[i].link = link;
                    break;
                }
            }

            this.setState({
                todos
            });
        }
    }

    render(){
        return (
            <TodoContext.Provider value={{
                todos: this.state.todos,
                ...this.todosOperations
            }}>
                {this.props.children}
            </TodoContext.Provider>
        )
    }
}