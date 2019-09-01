import React, { useState } from 'react';
import TodoItem from '../../components/Todo';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { withContext } from '../../contexts';
import { DragHandleIcon } from '../../components/Icons';
import { ListWrapper, ListNameWrapper, ProgressWrapper, DragHandleWrapper } from './list.style';

const List = ({ id, index, title, todoIds, todos, theme }) => {
  const [showDragIcon, setShowDragIcon] = useState(false);

  return (
    <Draggable draggableId={id} index={index}>
      {
        (provided) => (
          <ListWrapper
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
              <div
                onMouseEnter={() => setShowDragIcon(true)}
                onMouseLeave={() => setShowDragIcon(false)}
              >
                <ListNameWrapper>
                  {title}
                </ListNameWrapper>
                <ProgressWrapper>
                  {todoIds.reduce((acc, cur) => todos[cur].completed ? acc + 1 : acc, 0)}/{todoIds.length}
                </ProgressWrapper>
                <DragHandleWrapper>
                    {
                      showDragIcon &&
                      <DragHandleIcon
                        defaultIconColor={theme.icon.default}
                      />
                    }
                </DragHandleWrapper>
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
}

export default withContext(List);