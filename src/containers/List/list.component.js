import React, { Component } from 'react';
import TodoItem from '../../components/Todo';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { withContext } from '../../contexts';
import { DragHandleIcon, EditIcon } from '../../components/Icons';
import { ListWrapper, ListNameWrapper, DragHandleWrapper, ListHeader, ListInput, ListText } from './list.style';

class List extends Component {
  state = {
    isEditing: false,
    listInputValue: '',
    showDragIcon: false,
    showEditIcon: false,
  }

  onEditEnd() {
    this.setState({ isEditing: false, showEditIcon: false });
    this.props.setList(this.props.id, this.state.listInputValue);
  }

  renderListName(){
    const { name } = this.props;
    return (
      this.state.isEditing ?
      (
        <ListInput
          autoFocus
          value={this.state.listInputValue}
          onClick={e => e.stopPropagation()}
          onChange={e => { this.setState({ listInputValue: e.target.value }) }}
          onFocus={() => this.setState({ listInputValue: name })}
          onBlur={() => this.onEditEnd()}
          onKeyPress={e => { if (e.key === 'Enter') this.onEditEnd() }}
        />
      ) : (
        <span
          onClick={(e) => {
            e.stopPropagation();
            this.setState({ isEditing: true })
          }}
        >
          <ListText
            onMouseOver={() => { this.setState({ showEditIcon: true }) }}
            onMouseOut={() => { this.setState({ showEditIcon: false }) }}
          >
            {name}
          </ListText>
          {this.state.showEditIcon && <EditIcon size={10}/>}
        </span>
      )
    )
  }

  render() {
    const { id, index, todoIds, todos, theme } = this.props;
    return (
      <Draggable draggableId={id} index={index}>
        {
          (provided) => (
            <ListWrapper
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <ListHeader
                onMouseEnter={() => this.setState({showDragIcon: true})}
                onMouseLeave={() => this.setState({showDragIcon: false})}
              >
                <ListNameWrapper>
                  {this.renderListName()}
                </ListNameWrapper>
                {/* <ProgressWrapper>
                  {todoIds.reduce((acc, cur) => todos[cur].completed ? acc + 1 : acc, 0)}/{todoIds.length}
                </ProgressWrapper> */}
                <DragHandleWrapper>
                  {
                    this.state.showDragIcon &&
                    <DragHandleIcon
                      size={15}
                      defaultIconColor={theme.icon.default}
                    />
                  }
                </DragHandleWrapper>
              </ListHeader>
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
    );
  }
}

export default withContext(List);