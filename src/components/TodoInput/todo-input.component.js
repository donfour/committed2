import React, { Component } from 'react';
import { TodoInputWrapper } from './todo-input.style';
import { withTodoContext } from '../../context/TodoContext';

class TodoInput extends Component {
    state = {
        newTodoName: ''
    }

    updateTime(){
        var timeNow = new Date();
        this.setState({
            timeNow: String(timeNow).split(' ').slice(0,5).join(' ')
        })
    }

    componentDidMount(){
        this.updateTime();
        setInterval(this.updateTime.bind(this), 1000);
    }

    handleKeyPress(e){
        if(e.key === 'Enter'){
            const newTodoName = this.state.newTodoName.trim();
            if(newTodoName!==''){
                this.props.todos.add(newTodoName);
                this.setState({ newTodoName: '' });
            }
        }
    }

    render(){
        return (
            <TodoInputWrapper
                value={this.state.newTodoName}
                onChange={e => {this.setState({newTodoName: e.target.value})}}
                placeholder={this.state.timeNow}
                onKeyPress={this.handleKeyPress.bind(this)}
            />
        )
    }
};

export default withTodoContext(TodoInput);