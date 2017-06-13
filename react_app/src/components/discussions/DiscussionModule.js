import React,{Component} from "react";
import {DiscussionList} from "./DiscussionList";
import {ScoreList} from "./ScoreList";
import { Button, Card, Row, Col, Collection,CollectionItem,Icon,Input } from 'react-materialize';

var rest, mime, client;

rest = require('rest');
mime = require('rest/interceptor/mime');
client = rest.wrap(mime);


export class DiscussionModule extends Component{
	constructor(props){
		super(props);
		this.state={activeTab:1,naziv:'Sve Diskusije'};
	}

	render(){

		return(

			
			<Row>
		        <Col s={3}>
					<Collection>
						<CollectionItem href='#' active={this.state.activeTab==1} onClick={()=>{this.setState({activeTab:1})}}>Diskusije</CollectionItem>
						<CollectionItem href='#' active={this.state.activeTab==2} onClick={()=>{this.setState({activeTab:2})}}>Rang lista</CollectionItem>
					</Collection>
				</Col>

				  {
		          this.state.activeTab==1 &&
		         
		          <Col s={8}>
		            <DiscussionList></DiscussionList>
		          </Col>
		          	
		        }

		        {
		          this.state.activeTab==2 &&
		         
		          <Col s={8}>
		            <ScoreList></ScoreList>
		          </Col>
		          	
		        }
				
			</Row>

			
			
		
			

		
		);
	}
}