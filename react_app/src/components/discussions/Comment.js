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
		this.state={positiveVotes:0,negativeVotes:0,comment:{}};
		this.upVote=this.upVote.bind(this);
		this.downVote=this.downVote.bind(this);
		
	}
    
 
	downVote(e){

		if(localStorage["username"]!=null && localStorage["username"]!=undefined){
	       client({
	       	method:'GET',
	       	path:'http://localhost:8082/comment/downcomment?username='+localStorage["username"]+"&id="+this.props.comment.id
	       }).then(response2=>{
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
	       })
  		}
	}

	upVote(e){

		if(localStorage["username"]!=null && localStorage["username"]!=undefined){
	       client({
	       	method:'GET',
	       	path:'http://localhost:8082/comment/upcomment?username='+localStorage["username"]+"&id="+this.props.comment.id
	       }).then(response2=>{
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
	       })
  		}

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



           <CollectionItem style={{backgroundColor:'#00695c',borderStyle:'none'}}>
			<Col m={6} s={12}>
			    
				<Card style={{backgroundColor:'#ee6e73'}} textClassName='white-text'>

				<Icon>account_circle</Icon>
			    <span>{this.props.comment.regUser.username} 
			    </span>
			    {this.props.comment.regUser.username==localStorage["username"] &&
			    <span style={{cursor:'pointer'}} onClick={()=>{this.props.delete(this.props.comment.id)}}><Icon right>delete</Icon></span>
			  
				}
				  <br/>
			    <hr/>
			    <span>Tekst komentara:</span><br/>
				{this.props.comment.text}

				
			
			    <br/>

			    <Row>

			    <Col offset="s10" s={1}>
					
					<p>
						<span style={{cursor:'pointer'}} className="right" onClick={this.upVote}>
						<Icon style={{cursor:'pointer'}}>favorite</Icon>
						
						{this.state.positiveVotes}
						</span>
					</p>

				</Col>

				

				<Col s={1}>
					
					<p>
					<span style={{cursor:'pointer'}} className="right" onClick={this.downVote}>
					<Icon style={{cursor:'pointer'}}>opacity</Icon>

						{this.state.negativeVotes}
					</span>
					</p>

				</Col>

				</Row>
			    
				
				</Card>
			</Col>

			</CollectionItem>
		)
	}
}