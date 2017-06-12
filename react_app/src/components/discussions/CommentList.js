import React,{Component} from "react";
import { Link } from 'react-router-dom'
import { Button, Card, Row, Col, Collection,CollectionItem,Icon,Input } from 'react-materialize';

import {Comment} from "./Comment";

var rest, mime, client;

rest = require('rest');
mime = require('rest/interceptor/mime');
client = rest.wrap(mime);

export class CommentList extends Component{


	constructor(props){
		super(props);
		
	}


	render(){
		var comments=this.props.comments.map(comment=>
			<Comment key={comment.id} comment={comment}/>);

			return(
		


				<Collection>
				{comments}
				</Collection>
			)
	}


	}