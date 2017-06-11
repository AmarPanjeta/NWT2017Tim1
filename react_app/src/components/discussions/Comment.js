import React,{Component} from "react";
import { Link } from 'react-router-dom'
import { Button, Card, Row, Col, Collection,CollectionItem,Icon,Input } from 'react-materialize';



var rest, mime, client;

rest = require('rest');
mime = require('rest/interceptor/mime');
client = rest.wrap(mime);


export class Comment extends Component{

	constructor(props){
		super(props);
	}

	render(){
		
		return(



           <CollectionItem>
			<Col m={6} s={12}>
			    <Icon>account_circle</Icon>
			    <span><b></b> |
			     
			    </span>
				<Card className='blue-grey darken-1' textClassName='white-text' title={this.props.comment.text} actions={[<Link to={'/discussions/'+this.props.discussion.id}>Prikazi detalje</Link>]}>
				{this.props.comment.text}
				
				<Icon right>favorite</Icon>
				
			    <Icon right>opacity</Icon>
				
				</Card>
			</Col>

			</CollectionItem>
		)
	}
}