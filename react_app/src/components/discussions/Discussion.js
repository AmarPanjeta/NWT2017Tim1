import React, {Component} from "react";
import { Button, Card, Row, Col, Collection,CollectionItem,Icon } from 'react-materialize';


var rest, mime, client;

rest = require('rest');
mime = require('rest/interceptor/mime');
client = rest.wrap(mime);

export class Discussion extends Component{

	constructor(props){
		super(props);
		this.state={user:{username:'',email:''}};
	}
    

    componentDidMount(){
    	client({
    		method:'GET',
    		path:'http://localhost:8082/discussions/'+this.props.discussion.id+'/regUser'
    	}).then(response=>{
    		console.log("odgovor",response);
    	this.setState({user:response.entity})
    		}
    	)
    }
	render(){
		console.log(this.props.discussion);
		return(



           <CollectionItem>
			<Col m={6} s={12}>
			    <Icon>account_circle</Icon>
			    <span><b>{this.state.user.username}</b> |
			       	{this.props.discussion.open &&
					<span><b>Otvorena</b></span>
						}

					{this.props.discussion.open==false && 
							<span><b>Zatvorena</b></span>
						}
			    </span>
				<Card className='blue-grey darken-1' textClassName='white-text' title={this.props.discussion.title} actions={[<a href='#'>Prikazi detalje</a>]}>
				{this.props.discussion.text}
				
				<Icon right>favorite</Icon>
				
			    <Icon right>opacity</Icon>
				
				</Card>
			</Col>

			</CollectionItem>
		)
	}
}