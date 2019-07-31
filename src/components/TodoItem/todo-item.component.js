// external dependencies
import React, { Component } from 'react';
import { Collapse } from 'react-collapse';
import { Draggable } from 'react-beautiful-dnd';
// components
import { CalendarIcon, DeleteIcon, EditIcon } from '../Icons';
import { Checkbox, DaySelector, AddLinkButton, LinkButton } from './subcomponents';
// styled components
import { Todo, Body, CheckboxWrapper, TodoWrapper, TodoText, TodoInput, DuedateWrapper, TodoFooterWrapper, ButtonsWrapper } from './todo-item.style';
// contexts
import { withContext } from '../../contexts';

// helper functions
function formatDate(msSince1970) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date(parseInt(msSince1970, 10));
  return date.getDate() + ' ' + months[date.getMonth()];
}

class TodoItem extends Component {
  state = {
    todoInputValue: '',
    isCollapseOpened: false,
    displayEditIcon: false,
    isEditing: false
  }

  toggleOpen() {
    this.setState(({ isCollapseOpened }) => ({
      isCollapseOpened: !isCollapseOpened
    }))
  }

  onEditEnd() {
    this.setState({ isEditing: false, displayEditIcon: false });
    this.props.setTodo(this.props.id, this.state.todoInputValue);
  }

  renderTodoText() {
    const { id, name, dueDate, theme, link } = this.props;

    return (
        this.state.isEditing ?
        (
          <TodoInput
            autoFocus
            theme={theme}
            value={this.state.todoInputValue}
            onClick={e => e.stopPropagation()}
            onChange={e => { this.setState({ todoInputValue: e.target.value }) }}
            onFocus={() => this.setState({ todoInputValue: name })}
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
            <TodoText
              theme={theme}
              onMouseOver={() => { this.setState({ displayEditIcon: true }) }}
              onMouseOut={() => { this.setState({ displayEditIcon: false }) }}
            >
              {name}
            </TodoText>
            {dueDate ? <DuedateWrapper theme={theme}>({formatDate(dueDate)})</DuedateWrapper> : null}
            {link && <LinkButton id={id} link={link} theme={theme}/>}
            {this.state.displayEditIcon && <EditIcon theme={theme}/>}
          </span>
        )
    );
  }

  render() {
    const {
      id, index, theme,
      completed, setTodoCompleted,
      link, setTodoLink,
      daysOfWeek, toggleTodoDayOfWeek,
      deleteTodo,
      setTodoBeingEdited,
      setCalendarModalOpen,
    } = this.props;

    return (
      <Draggable draggableId={id} index={index}>
        {
          (provided) => (
            <Todo
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              theme={theme}
            >

              <Body>
                <CheckboxWrapper>
                  <Checkbox
                    theme={theme}
                    isChecked={completed}
                    onClick={() => setTodoCompleted(id, !completed)}
                  />
                </CheckboxWrapper>
                <TodoWrapper onClick={() => { this.toggleOpen() }} >
                  {this.renderTodoText()}
                </TodoWrapper>
              </Body>

              <Collapse isOpened={this.state.isCollapseOpened}>
                <TodoFooterWrapper>
                    <DaySelector
                      id={id}
                      daysOfWeek={daysOfWeek}
                      toggleTodoDayOfWeek={toggleTodoDayOfWeek}
                    />
                    <ButtonsWrapper>
                        <AddLinkButton
                          id={id}
                          link={link}
                          size={19}
                          theme={theme}
                          setTodoLink={setTodoLink}
                        />
                        <CalendarIcon
                          theme={theme}
                          onClick={() => { setTodoBeingEdited(id); setCalendarModalOpen(true); }}
                        />
                        <DeleteIcon
                          theme={theme} onClick={() => deleteTodo(id)}
                        />
                    </ButtonsWrapper>
                </TodoFooterWrapper>
              </Collapse>

            </Todo>
          )
        }
      </Draggable>
    )
  }
}

export default withContext(TodoItem);