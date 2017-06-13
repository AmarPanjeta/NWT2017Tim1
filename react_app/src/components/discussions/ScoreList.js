import React,{Component} from "react";
import {Score} from "./Score";
import { Button, Card, Row, Col, Collection,CollectionItem,Icon,Input } from 'react-materialize';


var rest, mime, client;

rest = require('rest');
mime = require('rest/interceptor/mime');
client = rest.wrap(mime);


export class ScoreList extends Component{
	constructor(props){
		super(props);
		this.state={scores:[]};
	}

	componentDidMount(){
		client({
			method:'GET',
			path:'http://localhost:8082/score/ranglist'
		}).then(response=>{
			this.setState({scores:response.entity});
		})
	}


	render(){
    var scores=this.state.scores.map(score=>
    <Score key={score.id} score={score}/>);
    return(
        <span>

              
            <h3 style={{color:'#00695c'}} className='center-align'>Rang lista</h3>
               
		      <hr/>
		      <table>
		        <tbody>
		          <tr>
		            <th>Korisnik</th>
		            <th>Poeni</th>
		          </tr>
		          {scores}
		        </tbody>
		      </table>

      </span>

    )
  
	}
}