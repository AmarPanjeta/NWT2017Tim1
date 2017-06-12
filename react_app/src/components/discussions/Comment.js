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
		this.state={positiveVotes:0,negativeVotes:0};
	}

	componentDidMount(){
		client({
			method:'GET',
			path:'http://localhost:8082/comment/positivevotes?id='+this.props.comment.id
		}).then(response=>{
			client({
				method:'GET',
				path:'http://localhost:8082/comment/negativevotes?id='+this.props.comment.id
			}).then(response1=>{
				this.setState({positiveVotes:response.entity,negativeVotes:response1.entity});
			})
		})
	}

	render(){
		
		return(



           <CollectionItem>
			<Col m={6} s={12}>
			    
				<Card style={{backgroundColor:'#ee6e73'}} textClassName='white-text'>

				<Icon>account_circle</Icon>
			    <span>{this.props.comment.regUser.username} 
			    </span>
			    <br/>
			    <hr/>
			    <span>Tekst komentara:</span><br/>
				{this.props.comment.text}
				
			
			    <br/>

			    <Row>

			    <Col offset="s10" s={1}>
					
					<p>
						<Icon>favorite</Icon>
						{this.state.positiveVotes}
					</p>

				</Col>

				

				<Col s={1}>
					
					<p>
						<Icon>opacity</Icon>
						{this.state.negativeVotes}
					</p>

				</Col>

				</Row>
			    
				
				</Card>
			</Col>

			</CollectionItem>
		)
	}
}