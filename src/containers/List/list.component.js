import React, { Component } from 'react';
import Todo from '../../components/Todo';
import { Collapse } from 'react-collapse';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { withContext } from '../../contexts';
import { ArrowIcon, DeleteIcon, EditIcon, PlusIcon } from '../../components/Icons';
import { ListWrapper, ListNameWrapper, SideMenu, ListHeader, ListInput, ListText } from './list.style';

class List extends Component {
  state = {
    isEditing: false,
    isExpanded: true,
    listInputValue: '',
    showEditIcon: false,
    showSideMenu: false,
  }

  componentDidMount() {
    // Autofocus on input if list name is empty (when a new list is created)
    if (this.props.name === '') {
      this.setState({ isEditing: true });
    }
  }

  onEditEnd() {
    this.props.setList(this.props.id, this.state.listInputValue);

    if (!this.state.listInputValue) return;

    this.setState({ isEditing: false, showEditIcon: false });
  }

  renderListName() {
    const { name } = this.props;
    return (
      this.state.isEditing ?
        (
          <ListInput
            autoFocus
            placeholder='New list name...'
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
            {this.state.showEditIcon && <EditIcon size={10} />}
          </span>
        )
    )
  }

  render() {
    const { id, index, todoIds, todos, theme, addTodo, deleteList } = this.props;
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
                onClick={() => this.setState(({ isExpanded }) => ({ isExpanded: !isExpanded }))}
                onMouseOver={() => this.setState({ showSideMenu: true })}
                onMouseLeave={() => this.setState({ showSideMenu: false })}
              >
                <ListNameWrapper>
                  {this.renderListName()}
                </ListNameWrapper>
                {/* <ProgressWrapper>
                  {todoIds.reduce((acc, cur) => todos[cur].completed ? acc + 1 : acc, 0)}/{todoIds.length}
                </ProgressWrapper> */}
                <SideMenu>
                  {
                    this.state.showSideMenu &&
                    (
                      <React.Fragment>
                        <PlusIcon
                          defaultIconColor={theme.icon.default}
                          hoverIconColor={theme.icon.hover}
                          onClick={(e) => { e.stopPropagation(); addTodo('hello', id); }}
                        />
                        <DeleteIcon
                          small
                          defaultIconColor={theme.icon.default}
                          hoverIconColor={theme.icon.hover}
                          onClick={(e) => { e.stopPropagation(); deleteList(id); }}
                        />
                        <ArrowIcon
                          active={this.state.isExpanded}
                          defaultIconColor={theme.icon.default}
                          hoverIconColor={theme.icon.hover}
                        />
                      </React.Fragment>
                    )
                  }
                </SideMenu>
              </ListHeader>

              <Collapse hasNestedCollapse isOpened={this.state.isExpanded}>
                <Droppable droppableId={id} isDropDisabled={!this.state.isExpanded} type='todo'>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{minHeight: '30px'}}
                    >
                      {
                        this.state.isExpanded && todoIds.map((id, index) => (
                          <Todo
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
              </Collapse>

            </ListWrapper>
          )
        }
      </Draggable>
    );
  }
}

export default withContext(List);