import React from 'react';
import '../css/DayOfWeek.css';

export default class DayOfWeek extends React.Component{
  state = {
    onHover: false
  }
  render(){
    var underlineClass = "underline";
    if(this.props.completed || this.state.onHover){
      underlineClass += " completed";
    }
    return(
        <div
          className={underlineClass}
          onClick={()=>{this.props.toggleDayOfWeek()}}
          onMouseOver={()=>{this.setState({onHover: true})}}
          onMouseOut={()=>{this.setState({onHover: false})}}
        >
          {this.props.dayName}
        </div>
    )
  }
}
