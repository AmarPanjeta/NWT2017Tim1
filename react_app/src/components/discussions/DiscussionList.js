import React,{Component} from "react";
import {Discussion} from "./Discussion";
import { Button, Card, Row, Col, Collection,CollectionItem,Icon,Input } from 'react-materialize';

var rest, mime, client;

rest = require('rest');
mime = require('rest/interceptor/mime');
client = rest.wrap(mime);


export class DiscussionList extends Component{

	constructor(props){
		super(props);
		this.state={discussions:[],show:false,naziv:'',tekst:'',selectedOption:''};
		this.addDiscussion=this.addDiscussion.bind(this);
		this.deleteDiscussion=this.deleteDiscussion.bind(this);
		this.handleOptionChange=this.handleOptionChange.bind(this);
	}

	handleOptionChange(e){
	   e.persist();
	    if(e.target.value=='option1'){

					return client({method:'GET',path:'http://localhost:8082/discussion/getdiscussions?status=true'}).then(response1=>{
						this.setState({
							discussions: response1.entity,
							selectedOption:e.target.value
						})
						console.log("opc",this.state.selectedOption);
					})
		}else if(e.target.value=='option2'){
			return client({method:'GET',path:'http://localhost:8082/discussion/getdiscussions?status=false'}).then(response1=>{
						this.setState({
							discussions: response1.entity,
							selectedOption:e.target.value
						})
						console.log("opc",this.state.selectedOption);
					})
		}else if(e.target.value=='option3'){
			return client({method:'GET',path:'http://localhost:8082/discussion/userdiscussions?username='+localStorage["username"]+'&status=true'}).then(response1=>{
						this.setState({
							discussions: response1.entity,
							selectedOption:e.target.value
						})
						console.log("opc",this.state.selectedOption);
					})
		}else if(e.target.value=='option4'){
			return client({method:'GET',path:'http://localhost:8082/discussion/userdiscussions?username='+localStorage["username"]+'&status=false'}).then(response1=>{
						this.setState({
							discussions: response1.entity,
							selectedOption:e.target.value
						})
						console.log("opc",this.state.selectedOption);
					})
		}else if(e.target.value=='option5'){
			return client({method:'GET',path:'http://localhost:8082/discussion/interestingdiscussions?username='+localStorage["username"]}).then(response1=>{
						this.setState({
							discussions: response1.entity,
							selectedOption:e.target.value
						})
						console.log("opc",this.state.selectedOption);
					})
		}

	}

	deleteDiscussion(id){
    	if(localStorage["username"]!=null && localStorage["username"]!='undefined'){
    		client({
    			method:'GET',
    			path:'http://localhost:8082/discussion/delete?id='+id+"&username="+localStorage["username"]
    		}).then(response=>{
    				client({
						method:'GET',
						path:'http://localhost:8082/discussions'
					}).then(response1=>{
						this.setState({discussions:response1.entity._embedded.discussions,show:false});
					})
    		})
    	}
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
			<Discussion key={discussion.id} discussion={discussion} delete={this.deleteDiscussion} />);

			return(
		        
		        <span>

              
                <h3 style={{color:'#00695c'}} className='center-align'>Panel za diskusije</h3>
               
                <hr/>



               <h5 style={{color:'#00695c'}} className='center-align'>Filteri</h5>

                <Row>
                    <Col s={3}>
                	
                	<Input type='radio' value='option1' checked={this.state.selectedOption==='option1'}  onChange={this.handleOptionChange} label='Sve otvorene diskusije' />
					<Input type='radio' value='option2' checked={this.state.selectedOption==='option2'}  onChange={this.handleOptionChange} label='Sve zatvorene diskusije' />
					
					
					</Col>
					<Col s={3}>
					
					<Input type='radio' value='option3' checked={this.state.selectedOption==='option3'}   onChange={this.handleOptionChange} label='Moje otvorene diskusije' />
					<Input type='radio' value='option4' checked={this.state.selectedOption==='option4'}  onChange={this.handleOptionChange} label='Moje zatvorene diskusije' />
					
					
					</Col>
					<Col s={3}>
					<Input type='radio' value='option5' checked={this.state.selectedOption==='option5'}  onChange={this.handleOptionChange} label='Samo interesantne' />
					</Col>
					<Col s={3}>
					<Input type='radio' value='option6' checked={this.state.selectedOption==='option6'}  onChange={this.handleOptionChange} label='Aktuelne' />
					</Col>
					
				</Row>

				

				
				<Collection>

				{discussions}
				
                <Card style={{backgroundColor:'#009688'}} textClassName='white-text' title='Dodavanje diskusije: ' actions={actions}>
		          

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

              </span>

			
			)
	}


}





