import React,{Component} from "react";
import ReactDOM from "react-dom";

export class CreateDialog extends Component{
  constructor(props){
    super(props);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    var newUser={};
    this.props.attributes.forEach(attribute=>{
      newUser[attribute]=ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
    });
    newUser.id=null;
    this.props.onCreate(newUser);

      // clear out the dialog's inputs
    this.props.attributes.forEach(attribute => {
      ReactDOM.findDOMNode(this.refs[attribute]).value = '';
    });

    // Navigate away from the dialog to hide it.
    window.location = "#";
  }

  render(){
    var inputs=this.props.attributes.map(attribute=>
      <p key={attribute}>
        <input type="text" placeholder={attribute} ref={attribute} className="field"/>
      </p>
    );
      return(
        <div>
          <a href="#createUser">Create</a>

          <div id="createUser" className="modalDialog">
            <div>
              <a href="#" title="Close" className="close">X</a>

              <h2>Create new user</h2>

              <form>
                {inputs}
                <button onClick={this.handleSubmit}>Create</button>
              </form>
            </div>
          </div>
        </div>
      );
  }
}
