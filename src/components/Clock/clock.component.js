import React, { Component } from 'react';
import { Clock } from './clock.style';
import { withStore } from '../../store';

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
            timeNow: ''
        }
        this.updateTimeNow = this.updateTimeNow.bind(this);
        this.renderClockText = this.renderClockText.bind(this);
    }

    componentDidMount(){
        this.updateTimeNow();
        setInterval(this.updateTimeNow, 1000);
    }

    updateTimeNow(){
        this.setState({ timeNow: String(new Date()) });
    }

    renderClockText(){
        const { customQuote } = this.props.clockSettings;
        
        if(customQuote.value) return customQuote.value;

        const { showDayOfWeek, showTime, showDate, show24HourClock, showDayBeforeMonth } = this.props.clockSettings;
        const [ dayOfWeek, month, day, year, time ] = this.state.timeNow.split(' ');

        let clockText = '';

        if(showDayOfWeek.value) clockText += `${dayOfWeek} `;
        if(showDate.value) clockText += showDayBeforeMonth.value ? (`${day} ${month} ${year} `) : (`${month} ${day} ${year} `);
        if(showTime.value) clockText += show24HourClock.value ? time : convert24HourTo12Hour(time);
        
        return clockText;
    }

    render(){
        const { theme } = this.props;
        return (
            <Clock
                textColor={theme.clock}
                borderColor={theme.primary}
            >
                {this.renderClockText()}
            </Clock>
        )
    }
};

export default withStore(TodoInput);