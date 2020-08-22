import React from 'react';

class Setter extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){ //set goal
    e.preventDefault();
    this.props.handleSubmit(e.target.goal.value);
  }

  render(){
    var children = this.props.children;

    return(
      <div className="right">
        <button type="button" class="btn" data-toggle="modal" data-target="#myModal" data-title="myTitle" aria-label="Left Align">
          <i class="fas fa-asterisk"></i>
        </button>
        <div class="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title text" id="myModalLabel">Setting</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              </div>
              <div class="modal-body">
                <form class="set-text" onSubmit={this.handleSubmit}>
                  <input type="text" placeholder="Set your goal (Optinal) - Press [SET]"name="goal" class="form-control col-sm-10" />
                  <input type="submit" class="btn" value="SET"/>
                </form>
                {children}
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Setter;
