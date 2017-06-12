import React, {Component} from "react";

export class Discussion extends Component{

	constructor(props){
		super(props);
	}

	render(){
		return(
			<tr>
				<td>{this.props.discussion.title}</td>
				<td>{this.props.discussion.text}</td>
			</tr>
		)
	}
}