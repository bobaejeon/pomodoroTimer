import React from 'react';

class SetTime extends React.Component {
  constructor(props){
    super(props);
    this.minutes = 0;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(value){ //set time
    var minutes = value==="+" ? this.props.minutes+1 : this.props.minutes-1;
    if(minutes<1){
      minutes = 1;
    }
    else if(minutes>59){
      minutes = 59;
    }
    this.props.handleClick(this.props.state,minutes);
  }

  render(){
    return(
      <div className="set-time">
        <p className="text col-form-label">{this.props.state} Length: {this.props.minutes} minutes</p>
        <div className="right">
          <button className="btn" value="+" onClick={e => this.handleClick(e.target.value)}>
            <i class="fas fa-plus-circle"></i>
          </button>
          <button className="btn" value="-" onClick={e => this.handleClick(e.target.value)}>
            <i class="fas fa-minus-circle"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default SetTime;
