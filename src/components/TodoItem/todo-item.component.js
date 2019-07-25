// external dependencies
import React, { Component } from 'react';
import { Collapse } from 'react-collapse';
import { Draggable } from 'react-beautiful-dnd';
// components
import { Todo, Body, CheckboxWrapper, TodoWrapper, TodoInput, DuedateWrapper, TodoFooterWrapper, ButtonsWrapper } from './todo-item.style';
import { CalendarIcon, DeleteIcon, EditIcon } from '../Icons';
import Checkbox from './Checkbox';
// react contexts
import { withTodoContext } from '../../context/TodoContext';

// helper functions
function formatDate(msSince1970) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date(parseInt(msSince1970, 10));
  return date.getDate() + ' ' + months[date.getMonth()];
}

class TodoItem extends Component {
  state = {
    todoInputValue: '',
    isOpened: false,
    displayEditIcon: false,
    isEditing: false
  }

  toggleOpen() {
    this.setState(({ isOpened }) => ({
      isOpened: !isOpened
    }))
  }

  onEditEnd() {
    this.setState({ isEditing: false, displayEditIcon: false });
    this.props.todos.setTodo(this.props.id, this.state.todoInputValue);
  }

  renderTodoText() {
    return (
        this.state.isEditing ?
        (
          <TodoInput
            autoFocus
            value={this.state.todoInputValue}
            onClick={e => e.stopPropagation()}
            onChange={e => { this.setState({ todoInputValue: e.target.value }) }}
            onFocus={() => this.setState({ todoInputValue: this.props.name })}
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
            <span
              onMouseOver={() => { this.setState({ displayEditIcon: true }) }}
              onMouseOut={() => { this.setState({ displayEditIcon: false }) }}
            >
              {this.props.name}
            </span>
            {this.props.dueDate ? <DuedateWrapper>({formatDate(this.props.dueDate)})</DuedateWrapper> : null}
            {this.state.displayEditIcon && <EditIcon />}
          </span>
        )
    );
  }

  render() {
    return (
      <Draggable draggableId={this.props.id} index={this.props.index}>
        {
          (provided) => (
            <Todo
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <Body>
                <CheckboxWrapper>
                  <Checkbox
                    isChecked={this.props.completed}
                    onClick={() => this.props.todos.setCompleted(this.props.id, !this.props.completed)}
                  />
                </CheckboxWrapper>
                <TodoWrapper onClick={() => { this.toggleOpen() }} >
                  {this.renderTodoText()}
                </TodoWrapper>
              </Body>
              <Collapse isOpened={this.state.isOpened}>
                <TodoFooterWrapper>
                    <div>Day of week list</div>
                    <ButtonsWrapper>
                        <CalendarIcon/>
                        <DeleteIcon/>
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

export default withTodoContext(TodoItem);