import React from 'react';
import TodoItem from '../../components/Todo';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { withContext } from '../../contexts';
import { ListWrapper } from './list.style';

const List = ({ id, index, title, todoIds, todos }) => (
  <Draggable draggableId={id} index={index}>
    {
      (provided) => (
        <ListWrapper
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
            <div>
              {title}
              {todoIds.reduce((acc, cur) => todos[cur].completed ? acc + 1 : acc, 0)}/{todoIds.length}
            </div>
            <Droppable droppableId={id} type='todo'>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {
                    todoIds.map((id, index) => (
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
        </ListWrapper>
      )
    }
  </Draggable>
)

export default withContext(List);