import React, { Component } from 'react';
import Todo from '../../components/Todo';
import { Collapse } from 'react-collapse';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { withContext } from '../../contexts';
import { ArrowIcon, DeleteIcon, EditIcon, PlusIcon } from '../../components/Icons';
import { ListWrapper, ListNameWrapper, SideMenu, ListHeader, ListInput, ListText } from './list.style';
import { FILTER_OPTIONS } from '../../constants/enums';
import moment from 'moment';

class List extends Component {
  state = {
    isEditing: false,
    isExpanded: true,
    listInputValue: '',
    showEditIcon: false,
    showSideMenu: false,
  }

  onEditEnd() {
    this.props.setList(this.props.id, this.state.listInputValue);

    if (!this.state.listInputValue) return;

    this.setState({ isEditing: false, showEditIcon: false });
  }

  renderListName() {
    const { name, theme } = this.props;
    return (
      this.props.name === '' || this.state.isEditing ?
        (
          <ListInput
            autoFocus
            value={this.state.listInputValue}
            textColor={theme.primary}
            inputPlaceholderColor={theme.inputPlaceholder}
            placeholder='New list name...'
            onBlur={() => this.onEditEnd()}
            onChange={e => { this.setState({ listInputValue: e.target.value }) }}
            onClick={e => e.stopPropagation()}
            onFocus={() => this.setState({ listInputValue: name })}
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
              textColor={theme.primary}
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
    const hideCompleted = this.props.todoSettings.hideCompleted.value;
    const filterByDuedate = this.props.todoSettings.filterByDuedate.value;

    return (
      <Draggable draggableId={id} index={index}>
        {
          (provided) => (
            <ListWrapper
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              borderColor={theme.border}
            >
              <ListHeader
                onClick={() => this.setState(({ isExpanded }) => ({ isExpanded: !isExpanded }))}
                onMouseOver={() => this.setState({ showSideMenu: true })}
                onMouseLeave={() => this.setState({ showSideMenu: false })}
              >
                <ListNameWrapper>
                  {this.renderListName()}
                </ListNameWrapper>
                <SideMenu>
                  {
                    this.state.showSideMenu &&
                    (
                      <React.Fragment>
                        <PlusIcon
                          defaultIconColor={theme.icon.default}
                          hoverIconColor={theme.icon.hover}
                          onClick={(e) => { e.stopPropagation(); addTodo('', id); }}
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
                      style={{ minHeight: '30px' }}
                    >
                      {
                        this.state.isExpanded &&
                        todoIds
                          .map(todoId => todos[todoId])
                          .filter(todo => hideCompleted ? !todo.completed : true)
                          .filter(todo => {
                            if(filterByDuedate === FILTER_OPTIONS.SHOW_ALL) return true;

                            if(!todo.dueDate && !todo.daysOfWeek.includes(true)) return true;
                            
                            const now = moment().startOf('day');

                            let daysTillDueDate = Number.MAX_SAFE_INTEGER;
                            if(todo.dueDate){
                              const dueDate = moment(parseInt(todo.dueDate));
                              daysTillDueDate = dueDate.diff(now, 'days');
                            }

                            let daysTillNextRecurringDay = Number.MAX_SAFE_INTEGER;
                            if(todo.daysOfWeek.includes(true)){
                              daysTillNextRecurringDay = todo.daysOfWeek.indexOf(true,now.day()) - now.day();
                            }
                            
                            const daysTillNext = Math.min(daysTillDueDate, daysTillNextRecurringDay);

                            switch (filterByDuedate) {
                              case FILTER_OPTIONS.DUE_BY_TODAY:
                                return daysTillNext < 1;
                              case FILTER_OPTIONS.DUE_BY_TOMORROW:
                                return daysTillNext <= 1;
                              case FILTER_OPTIONS.DUE_IN_A_WEEL:
                                return daysTillNext <= 7;;
                              case FILTER_OPTIONS.DUE_IN_A_MONTH:
                                return daysTillNext <= 31;;
                              default:
                                return true;
                            }
                          })
                          .map((todo, index) => (
                            <Todo
                              key={todo.id}
                              index={index}
                              {...todo}
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