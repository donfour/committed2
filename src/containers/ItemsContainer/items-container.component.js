import React from 'react';
import Todo from '../../components/Todo';
import List from '../List';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { withContext } from '../../contexts';

// helper function
const reorder = (array, startIndex, endIndex) => {
    const result = Array.from(array);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const ItemsContainer = ({ listOrder, lists, reorderItems }) => (
    <DragDropContext
        onDragEnd={result => {
            const { source, destination } = result;
            // do nothing if dropped outside list
            if (!destination) return;
            // do nothing if draggable's position has not changed
            if (destination.droppableId === source.droppableId && destination.index === source.index) return;

            const startIndex = result.source.index;
            const endIndex = result.destination.index

            // if moving within ItemsContainer
            if (source.droppableId === 'all-items' && destination.droppableId === 'all-items') {
                const newListOrder = reorder(listOrder, startIndex, endIndex);
                reorderItems(newListOrder);
                return;
            }

            const sourceList = lists[source.droppableId];
            const destinationList = lists[destination.droppableId];

            // if moving within a list
            if (sourceList === destinationList) {
                const newTodos = reorder(sourceList.todoIds, startIndex, endIndex);

                const newList = {
                    ...sourceList,
                    todoIds: newTodos
                };

                const newLists = {
                    ...lists,
                    [source.droppableId]: newList
                }

                reorderItems(null, newLists);
                return;
            }

            // if moving across two lists
            const sourceIds = Array.from(sourceList.todoIds);
            const destinationIds = Array.from(destinationList.todoIds);

            const [removed] = sourceIds.splice(startIndex, 1);
            destinationIds.splice(endIndex, 0, removed);

            const newSourceList = {
                ...sourceList,
                todoIds: sourceIds
            };

            const newDestinationList = {
                ...destinationList,
                todoIds: destinationIds
            };

            const newLists = {
                ...lists,
                [source.droppableId]: newSourceList,
                [destination.droppableId]: newDestinationList,
            }

            reorderItems(null, newLists);
            return;
        }}
    >
        <Droppable droppableId='all-items' type='item'>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {
                        listOrder.map((itemId, index) => (
                            <List
                                key={lists[itemId].id}
                                id={lists[itemId].id}
                                index={index}
                                {...lists[itemId]}
                            />
                        ))
                    }
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    </DragDropContext>
)

export default withContext(ItemsContainer);

