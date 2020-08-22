import React from 'react';
import ResetAndEnd from './ResetAndEnd';

class Time extends React.Component {
  constructor(props){
    super(props);
    this.isOn = false;
    this.isSession = false;
    this.remainSec = 0;
    this.totalTime = 0;
    this.state = {
      clock: this.props.sessionMin+":00",
      currentState:"session",
      isButtonsEnabled: false
    };
    this.handleClick = this.handleClick.bind(this); //set interval (start, pause, resume)
    this.resetAndEnd = this.resetAndEnd.bind(this); //reset or end
    this.timeStr = this.timeStr.bind(this); //convert seconds into string
  }

  timeStr(time){
    var hours = parseInt(time/3600);
    var mins = parseInt(time%3600 / 60);
    var secs = time % 3600 % 60;
    var hoursStr = hours>9?hours:"0"+hours;
    var minsStr = mins>9?mins:"0"+mins;
    var secsStr = secs>9?secs:"0"+secs;

    return [hoursStr, minsStr, secsStr];
  }

  componentDidUpdate(prevProps){
    if(this.props.sessionMin!==prevProps.sessionMin||
      this.props.breakMin!==prevProps.breakMin)//the time has changed
    {
      this.resetAndEnd("RESET");
    }
  }

  resetAndEnd(value){
      var time;
      var timeStr;
      var state;
      if(value==="END"){
        state = "done";
        time = this.timeStr(this.totalTime);
        this.totalTime = 0;
        var timeString = ()=>{
          var timeStrArray = [" hour(s) "," minute(s) "," second(s)"];
          var timeString = "Way to go!\n";
          for(var i=0 ; i<time.length ; i++){
            if(time[i]!=="00"){
              timeString += time[i]+timeStrArray[i];
            }
          }
          timeString += "\n in a row";
          return timeString;
        };
        timeStr = timeString();
      }
      else{
        state = "session";
        time = this.timeStr(this.props.sessionMin*60);
        timeStr = time[1]+":"+time[2];
      }
      this.setState({
        clock: timeStr,
        currentState: state,
        isButtonsEnabled: false
      });
      this.isOn = false;
      this.isSession = false;
      this.remainSec = 0;
  }
  handleClick(e){
    e.preventDefault();
    this.isOn = !this.isOn;
    this.setState({
      isButtonsEnabled: true
    });
    var interval = setInterval(()=>{
                if(this.isOn){
                  if(this.isSession&&this.remainSec===0){
                    this.isSession = false;
        						this.remainSec = this.props.breakMin*60;
        					}
        					else if(!this.isSession&&this.remainSec===0){
        						this.isSession = true;
        						this.remainSec = this.props.sessionMin*60;
        					}
      						this.totalTime += this.isSession?1:0;
  	    					this.remainSec--;
                  var state = this.isSession? "session":"break";
                  var time = this.timeStr(this.remainSec);
                  this.setState({
                    clock: time[1]+":"+time[2],
                    currentState: state,
                  });
      					}
      					else{
      						clearInterval(interval);
                  interval = null;
      					}
            	}, 1000);
  }

  render(){
    var thisState = this.state.currentState;
    var size = thisState==="done"? "small " : "big ";
    var clockClass = size+thisState;

    var state = thisState+" state";
    return (
      <div class="block">
          <button className="btn-circle" onClick={this.handleClick}>
            <p class="goal">{this.props.goal}</p>
            <p class={clockClass}>{this.state.clock}</p>
          </button>
          <p class={state}>{this.state.currentState.toUpperCase()}</p>
        <ResetAndEnd
          handleClick={this.resetAndEnd}
          isButtonsEnabled={this.state.isButtonsEnabled}
        />
      </div>
    );
  }
}

export default Time;
