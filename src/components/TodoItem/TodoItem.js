// module dependencies
import React, { Component } from 'react';
import styled from 'styled-components';
import { Collapse } from 'react-collapse';
// components
import { EditIcon } from '../Icons';
import Footer from './Footer';
import Checkbox from './Checkbox';
// context provider
import { withTodoContext } from '../../context/TodoContext';

const Todo = styled.div`
  border-bottom: 1px solid #DDDDDD;
`;

const Body = styled.div`
  display: flex;
  font-size: 20px;
  letter-spacing: 1px;
  overflow: scroll;
`;

const CheckboxContainer = styled.div`
  flex: 0 0 30px;
  padding-top: 23px
`;

const TodoWrapper = styled.div`
  flex: 1;
  padding: 20px;
  min-height: 25px;
  overflow: scroll;
`;

const TodoInput = styled.input`
  font-size: 20px;
  padding: 0;
  outline: none;
  width: 100%;
  border: none;
  letter-spacing: 1px;
  border-bottom: 1px solid black;
`;

const DuedateWrapper = styled.span`
  display: inline-block;
  color: salmon;
  font-size: 17px;
  margin-left: 5px;
`;

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
      <Todo>
        <Body>
          <CheckboxContainer>
            <Checkbox
              isChecked={this.props.completed}
              onClick={() => this.props.todos.setCompleted(this.props.id, !this.props.completed)}
            />
          </CheckboxContainer>
          <TodoWrapper onClick={() => { this.toggleOpen() }} >
            {this.renderTodoText()}
          </TodoWrapper>
        </Body>
        <Collapse isOpened={this.state.isOpened}>
          <Footer />
        </Collapse>
      </Todo>
    )
  }
}

export default withTodoContext(TodoItem);