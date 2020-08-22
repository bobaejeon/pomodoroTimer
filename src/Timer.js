import React from 'react';
import Time from './Time';
import SetTime from './SetTime';
import Setter from './Setter';
import './Timer.css';

class Timer extends React.Component { //set time
  constructor(props){
    super(props);
    this.state = {
      session: 25,
      break: 5,
      goal: ""
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(state, time){
    state = state.toLowerCase();
    this.setState({
      [state]: time
    });
  }

  handleSubmit(goal){
    this.setState({
    goal: goal
    });
  }

  render(){
      return (
        <div className="container">
          <Setter handleSubmit={this.handleSubmit}>
            <SetTime state = "Session" minutes={this.state.session} handleClick={this.handleClick}/>
            <SetTime state = "Break" minutes={this.state.break} handleClick={this.handleClick}/>
          </Setter>
          <Time goal={this.state.goal} sessionMin = {this.state.session} breakMin = {this.state.break} />
        </div>
    );
  }
}
export default Timer;
