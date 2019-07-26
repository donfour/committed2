import React from 'react';
import TodoItem from '../../components/TodoItem';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { withContext } from '../../context';

// helper function
const reorder = (array, startIndex, endIndex) => {
  const result = Array.from(array);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const TodoList = ({ todos, setTodos }) => (
  <DragDropContext
    onDragEnd={result => {
      const { destination, source } = result;
      // do nothing if dropped outside list
      if (!destination) return; 
      // do nothing if draggable's position has not changed
      if (destination.droppableId === source.droppableId && destination.index === source.index) return;

      const newTodos = reorder(
        todos,
        result.source.index,
        result.destination.index
      );

      setTodos(newTodos);
    }}
  >
    <Droppable droppableId='droppableId'>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {
            todos.map((todo, index) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                index={index}
                name={todo.name}
                dueDate={todo.dueDate}
                completed={todo.completed}
              />
            ))
          }
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
)

export default withContext(TodoList);