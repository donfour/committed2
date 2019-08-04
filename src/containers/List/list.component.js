import React from 'react';
import TodoItem from '../../components/Todo';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { withContext } from '../../contexts';

// helper function
const reorder = (array, startIndex, endIndex) => {
  const result = Array.from(array);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const TodoList = ({ itemOrder, todos, lists, reorderItems }) => (
  <DragDropContext
    onDragEnd={result => {
      // const { source, destination } = result;
      // // do nothing if dropped outside list
      // if (!destination) return; 
      // // do nothing if draggable's position has not changed
      // if (destination.droppableId === source.droppableId && destination.index === source.index) return;

      // const newTodos = reorder(
      //   todos,
      //   result.source.index,
      //   result.destination.index
      // );

      // setTodos(newTodos);
      console.log('reorder function to be implemented');
    }}
  >
    <Droppable droppableId='droppableId'>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {
            itemOrder.map((id, index) => (
              <TodoItem
                key={todos[id].id}
                index={index}
                {...todos[id]}
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