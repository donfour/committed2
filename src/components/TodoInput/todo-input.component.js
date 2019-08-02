import React, { Component } from 'react';
import { TodoInputWrapper } from './todo-input.style';
import { withContext } from '../../contexts';

// helper functions
const convert24HourTo12Hour = timeStr => {
    const [hour, minute, second] = timeStr.split(':');
    
    if(parseInt(hour) === 0) return `${timeStr} midnight`;

    if(parseInt(hour) < 12) return `${timeStr} a.m.`;

    if(parseInt(hour) === 12 ) return `${timeStr} noon`;

    return `${hour-12}:${minute}:${second} p.m.`;
}

class TodoInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newTodoName: '',
            timeNow: ''
        }
        this.updateTimeNow = this.updateTimeNow.bind(this);
        this.calculateInputPlaceholder = this.calculateInputPlaceholder.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount(){
        this.updateTimeNow();
        setInterval(this.updateTimeNow, 1000);
    }

    updateTimeNow(){
        this.setState({ timeNow: String(new Date()) });
    }

    calculateInputPlaceholder(){
        const { showDayOfWeek, showTime, showDate, show24HourClock, showDayBeforeMonth, customQuote } = this.props.inputPlaceholderSettings;
        const [ dayOfWeek, month, day, year, time ] = this.state.timeNow.split(' ');

        if(customQuote) return customQuote;

        let inputPlaceholder = '';

        if(showDayOfWeek) inputPlaceholder += `${dayOfWeek} `;
        if(showDate) inputPlaceholder += showDayBeforeMonth ? (`${day} ${month} ${year} `) : (`${month} ${day} ${year} `);
        if(showTime) inputPlaceholder += show24HourClock ? time : convert24HourTo12Hour(time);
        
        return inputPlaceholder;
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
                placeholder={this.calculateInputPlaceholder()}
                theme={this.props.theme}
                onChange={e => {this.setState({newTodoName: e.target.value})}}
                onKeyPress={this.handleKeyPress}
            />
        )
    }
};

export default withContext(TodoInput);