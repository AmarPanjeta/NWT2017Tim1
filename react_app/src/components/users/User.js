import React,{Component} from "react";

export class User extends Component{

  constructor(props){
    super(props);
  }
  render(){
    return (
      <tr>
        <td>{this.props.user.username}</td>
        <td>{this.props.user.email}</td>
        <td><button onClick={this.handleDelete}>Delete</button></td>
      </tr>
      )
  }
}
