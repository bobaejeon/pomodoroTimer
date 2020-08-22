import React from 'react';

class ResetAndEnd extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e){
    e.preventDefault();
    if(!this.props.isButtonsEnabled&&e.target.value==="END"){
      return;
    }
    this.props.handleClick(e.target.value);
  }
  render(){
    return(
      <div class="lower">
        <input class="btn reset" type="button" value="RESET" onClick={this.handleClick} />
        <input class="btn end" type="button" value="END" onClick={this.handleClick} />
      </div>
    );
  }
}

export default ResetAndEnd;
