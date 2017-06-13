import React,{Component} from "react";

export class Score extends Component{

  constructor(props){
    super(props);
  }
  render(){
    return (
      <tr>
        <td>{this.props.score.user.username}</td>
        <td>{this.props.score.points}</td>
     
      </tr>
      )
  }
}
