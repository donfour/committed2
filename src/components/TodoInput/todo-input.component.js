import React, { Component } from 'react';
import { TodoInputWrapper } from './todo-input.style';
import { withContext } from '../../contexts';

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
                this.props.addTodo(newTodoName);
                this.setState({ newTodoName: '' });
            }
        }
    }

    render(){
        return (
            <TodoInputWrapper
                value={this.state.newTodoName}
                placeholder={this.state.timeNow}
                theme={this.props.theme}
                onChange={e => {this.setState({newTodoName: e.target.value})}}
                onKeyPress={this.handleKeyPress.bind(this)}
            />
        )
    }
};

export default withContext(TodoInput);