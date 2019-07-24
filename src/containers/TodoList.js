import React from 'react';
import TodoItem from '../components/TodoItem/TodoItem';
import { withTodoContext } from '../context/TodoContext';

const TodoList = ({todos}) => (
    <div>
      {
        todos.value.map(todo => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            name={todo.name}
            dueDate={todo.dueDate}
            completed={todo.completed}
          />
        ))
      }
    </div>
)

export default withTodoContext(TodoList);