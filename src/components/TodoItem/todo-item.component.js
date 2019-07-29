// external dependencies
import React, { Component } from 'react';
import { Collapse } from 'react-collapse';
import { Draggable } from 'react-beautiful-dnd';
// components
import { Todo, Body, CheckboxWrapper, TodoWrapper, TodoInput, DuedateWrapper, TodoFooterWrapper, ButtonsWrapper } from './todo-item.style';
import { CalendarIcon, DeleteIcon, EditIcon } from '../Icons';
import Checkbox from './Checkbox';
// react contexts
import { withContext } from '../../context';

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
    this.props.setTodo(this.props.id, this.state.todoInputValue);
  }

  renderTodoText() {
    const { name, dueDate, theme } = this.props;

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
            <span
              onMouseOver={() => { this.setState({ displayEditIcon: true }) }}
              onMouseOut={() => { this.setState({ displayEditIcon: false }) }}
            >
              {name}
            </span>
            {dueDate ? <DuedateWrapper theme={theme}>({formatDate(dueDate)})</DuedateWrapper> : null}
            {this.state.displayEditIcon && <EditIcon theme={theme}/>}
          </span>
        )
    );
  }

  render() {
    const { id, index, completed, setTodoCompleted, deleteTodo, theme } = this.props;

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
                    isChecked={completed}
                    onClick={() => setTodoCompleted(id, !completed)}
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
                        <CalendarIcon theme={theme}/>
                        <DeleteIcon theme={theme} onClick={() => deleteTodo(id)}/>
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