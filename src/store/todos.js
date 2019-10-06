// import React, { Component, createContext } from 'react';
// import storage from '../utils/storage';

// export const TodoContext = createContext();

// export class TodoProvider extends Component {
//     state = {
//         todos: {},
//         lists: {},
//         listOrder: [],
//         todoBeingEdited: null
//     }

//     uncheckRecurringTodos() {
//         const { todos } = this.state;

//         for (let todoId in todos) {
//             const todo = todos[todoId];

//             const isRecurring = todo.daysOfWeek.includes(true)

//             const dayCompleted = todo.timeCompleted && (new Date(todo.timeCompleted)).getDate();

//             const dayToday = (new Date()).getDate();

//             if (todo.completed && isRecurring && (dayCompleted && dayCompleted !== dayToday)) {
//                 this.todosOperations.setTodoCompleted(todoId, false);
//             }
//         }
//     }

//     // component lifecycle
//     async componentDidMount() {
//         this.storage = storage;

//         const result = await storage.get('todos', 'lists', 'listOrder');
        
//         this.setState(result);
        
//         this.uncheckRecurringTodos();
        
//         setInterval(this.uncheckRecurringTodos.bind(this), 1000);

//         storage.on('save', (changes) => {
//             console.log('changes in TodoContext', changes);
//             this.setState(changes);
//         })
//     }

//     // state operations
//     todosOperations = {
//         addTodo: (name = '', listId) => {
//             const newState = JSON.parse(JSON.stringify(this.state));

//             const id = '_' + Math.random().toString(36).substr(2, 9);

//             const newTodo = {
//                 id,
//                 listId,
//                 name,
//                 link: null,
//                 dueDate: null,
//                 completed: false,
//                 daysOfWeek: [false, false, false, false, false, false, false],
//                 timeCompleted: null
//             }

//             newState.todos[id] = newTodo;

//             if (listId && listId in newState.lists) {
//                 newState.lists[listId].todoIds.push(id);
//             } else {
//                 newState.listOrder.push(id);
//             }
//             //TODO: not save the whole state (e.g. no need todoBeingEdited)
//             this.storage.set(newState);
//         },
//         addList: () => {
//             const newState = JSON.parse(JSON.stringify(this.state));

//             const id = '_' + Math.random().toString(36).substr(2, 9);

//             const newList = {
//                 id,
//                 name: '',
//                 todoIds: []
//             }

//             newState.lists[id] = newList;


//             newState.listOrder.push(id);

//             this.storage.set(newState);
//         },
//         setTodo: (todoId, newTodoName = '') => {
//             const todos = JSON.parse(JSON.stringify(this.state.todos));

//             if (!(todoId in todos)) return;

//             todos[todoId].name = newTodoName.trim();

//             this.storage.set({ todos });
//         },
//         setList: (listId, newListName) => {
//             const lists = JSON.parse(JSON.stringify(this.state.lists));

//             if (!(listId in lists)) return;

//             lists[listId].name = newListName;

//             this.storage.set({ lists });
//         },
//         setTodoCompleted: (todoId, completed) => {
//             const todos = JSON.parse(JSON.stringify(this.state.todos));

//             if (!(todoId in todos)) return;

//             todos[todoId].completed = completed;
//             todos[todoId].timeCompleted = completed ? (new Date()).getTime() : null;

//             this.storage.set({ todos });
//         },
//         toggleTodoDayOfWeek: (todoId, day) => {
//             //TODO: assert day is 0 - 6
//             const todos = JSON.parse(JSON.stringify(this.state.todos));

//             if (!(todoId in todos)) return;

//             todos[todoId].daysOfWeek[day] = !todos[todoId].daysOfWeek[day];

//             this.storage.set({ todos });
//         },
//         deleteTodo: (todoId) => {
//             const newState = JSON.parse(JSON.stringify(this.state));
//             const { todos, lists, listOrder } = newState;

//             if (!(todoId in todos)) return;

//             delete todos[todoId];

//             if (listOrder.includes(todoId)) {
//                 listOrder.splice(listOrder.indexOf(todoId), 1);
//             }

//             for (let listId in lists) {
//                 if (lists[listId].todoIds.includes(todoId)) {
//                     lists[listId].todoIds.splice(lists[listId].todoIds.indexOf(todoId), 1);
//                     break;
//                 }
//             }

//             this.storage.set(newState);
//         },
//         deleteList: (listId) => {
//             const newState = JSON.parse(JSON.stringify(this.state));
//             const { todos, lists, listOrder } = newState;

//             if (!(listId in lists)) return;

//             lists[listId].todoIds.forEach(todoId => delete todos[todoId]);

//             delete lists[listId];

//             if (listOrder.includes(listId)) {
//                 listOrder.splice(listOrder.indexOf(listId), 1);
//             }

//             this.storage.set(newState);
//         },
//         setTodoBeingEdited: (todoId) => {
//             this.setState({ todoBeingEdited: todoId });
//         },
//         setTodoDueDate: (dueDate) => {
//             const todos = JSON.parse(JSON.stringify(this.state.todos));
//             const { todoBeingEdited } = this.state;

//             if (!todoBeingEdited || !(todoBeingEdited in todos)) return;

//             todos[todoBeingEdited].dueDate = dueDate ? String(dueDate.getTime()) : null;

//             this.storage.set({ todos });
//         },
//         setTodoLink: (todoId, link) => {
//             const todos = JSON.parse(JSON.stringify(this.state.todos));

//             if (!(todoId in todos)) return;

//             todos[todoId].link = link;

//             this.storage.set({ todos });
//         },
//         reorderItems: (newListOrder, newLists) => {
//             const newState = {};
//             if (newListOrder) newState.listOrder = newListOrder;
//             if (newLists) newState.lists = newLists;
//             this.storage.set(newState);
//         },
//     }

//     render() {
//         return (
//             <TodoContext.Provider value={{
//                 ...this.state,
//                 ...this.todosOperations
//             }}>
//                 {this.props.children}
//             </TodoContext.Provider>
//         )
//     }
// }