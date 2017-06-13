import React,{Component} from "react";
import {Discussion} from "./Discussion";
import { Button, Card, Row, Col, Collection,CollectionItem,Icon } from 'react-materialize';

var rest, mime, client;

rest = require('rest');
mime = require('rest/interceptor/mime');
client = rest.wrap(mime);


export class DiscussionList extends Component{

	constructor(props){
		super(props);
		this.state={discussions:[],show:false,naziv:'',tekst:''};
		this.addDiscussion=this.addDiscussion.bind(this);
	}

	addDiscussion(e){
		e.preventDefault();
		client({
			method:'POST',
			path:'http://localhost:8082/discussion/create',
			headers:{'Content-Type':'application/json'},
			entity:{tekst:this.state.tekst,naziv:this.state.naziv,username:localStorage["username"]}
		}).then(response=>{
			client({
				method:'GET',
				path:'http://localhost:8082/discussions'
			}).then(response1=>{
				this.setState({discussions:response1.entity._embedded.discussions,show:false});
			})
		})
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
	  
	  var actions=[];

      if(!this.state.show) actions.push(<a style={{cursor:"pointer"}} onClick={()=>{this.setState({show:true})}}>Unesi diskusiju</a>);
      if(this.state.show){
          actions.push(<a style={{cursor:"pointer"}} onClick={(e)=>{e.preventDefault();this.setState({show:false,tekst:"",naziv:""})}}>Sakrij polje za unos diskusije</a>);
          actions.push(<a style={{cursor:"pointer"}} onClick={this.addDiscussion}>Dodaj diskusiju</a>);
        }


		var discussions=this.state.discussions.map(discussion=>
			<Discussion key={discussion.id} discussion={discussion} />);

			return(
		       
              
           
				<Collection header='Sve diskusije'  >

				{discussions}
				
                <Card className='teal darken-3' textClassName='white-text' title='Dodavanje diskusije: ' actions={actions}>
		          

		         <hr/>
				{this.state.show && localStorage["username"]!=null && localStorage["username"]!=undefined &&
		            <Row>
		              <div className="input-field col s12">
		                <textarea className="materialize-textarea" onChange={(e)=>{this.setState({naziv:e.target.value})}}></textarea>
		                <label >Naziv diskusije</label>
		              </div>
		              <div className="input-field col s12">
		                <textarea className="materialize-textarea" onChange={(e)=>{this.setState({tekst:e.target.value})}}></textarea>
		                <label >Tekst diskusije</label>
		              </div>
		            </Row>
		          }
		          </Card>
				</Collection>



			
			)
	}


}





