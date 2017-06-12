import React,{Component} from "react";
import {Discussion} from "./Discussion";

var rest, mime, client;

rest = require('rest');
mime = require('rest/interceptor/mime');
client = rest.wrap(mime);


export class DiscussionList extends Component{

	constructor(props){
		super(props);
		this.state={discussions:[]};
	}

	componentDidMount(){
		client({
			method:'GET',
			path:'http://localhost:8082/discussions'
		}).then(response=>{
			return client({method:'GET',path:'http://localhost:8082/discussions'}).then(discussionsCollection=>{
				this.setState({
					discussions: discussionsCollection.entity._embedded.discussions,
					attributes: this.state.attributes
				})
			})
		})
	}


	render(){
		var discussions=this.state.discussions.map(discussion=>
			<Discussion key={discussion.id} discussion={discussion}/>);

			return(
				<table>
					<tbody>
						<tr>
							<th>title</th>
							<th>text</th>
						</tr>
						{discussions}
					</tbody>
				</table>
			)
	}


}