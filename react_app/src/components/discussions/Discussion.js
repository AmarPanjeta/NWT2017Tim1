import React, {Component} from "react";
import { Button, Card, Row, Col, Collection,CollectionItem,Icon } from 'react-materialize';
import { Link } from 'react-router-dom'


var rest, mime, client;

rest = require('rest');
mime = require('rest/interceptor/mime');
client = rest.wrap(mime);

export class Discussion extends Component{

	constructor(props){
		super(props);
		this.state={user:{username:'',email:''},interestedIn:false};
		this.changeStatus=this.changeStatus.bind(this);
		
	}


    

  
    changeStatus(e){

    	if(this.state.interestedIn==true && localStorage["username"]!=null && localStorage["username"]!=undefined){
    	client({
    		method:'GET',
    		path:'http://localhost:8082/discussion/deleteinterest?username='+localStorage["username"]+'&id='+this.props.discussion.id
    	}).then(response=>{
    		this.setState({interestedIn:false});
    	})
    }else if(this.state.interestedIn==false && localStorage["username"]!=null && localStorage["username"]!=undefined){
    	client({
    		method:'GET',
    		path:'http://localhost:8082/discussion/addinterest?username='+localStorage["username"]+'&id='+this.props.discussion.id
    	}).then(response=>{
    		this.setState({interestedIn:true});
    	})
    }


    }

    componentDidMount(){
    	client({
    		method:'GET',
    		path:'http://localhost:8082/discussions/'+this.props.discussion.id+'/regUser'
    	}).then(response=>{
    		console.log("odgovor",response);
    		if(localStorage["username"]!=null && localStorage["username"]!=undefined){
    				client({
		    			method:'GET',
		    			path:'http://localhost:8082/discussion/isinterested?username='+localStorage["username"]+"&id="+this.props.discussion.id
		    		}).then(response1=>{
		    			this.setState({user:response.entity,interestedIn:response1.entity})
		    		})

    		}else{
    			this.setState({user:response.entity});
    		}
    		
    	
    		}
    	)
    }
	render(){
		console.log(this.props.discussion);
		return(



           <CollectionItem >
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

            {this.state.interestedIn==true &&
			  
			  <a className='btn btn-floating pulse right' onClick={this.changeStatus}> <Icon tiny >grade</Icon></a>

			   
			
			}
			{this.state.interestedIn==false &&
			  
			 <span style={{cursor:'pointer'}} className="right" onClick={this.changeStatus}><Icon right >grade</Icon></span>

			   
			
			}
				<Card className='teal darken-3' textClassName='white-text' title={'Naslov:'+ this.props.discussion.title} actions={[<Link to={'/discussions/'+this.props.discussion.id}>Prikazi detalje</Link>]}>
				
				{this.state.user.username==localStorage["username"] &&
				<span style={{cursor:'pointer'}} onClick={()=>{this.props.delete(this.props.discussion.id)}}><Icon right>delete</Icon></span>
			}
				<span >Tekst diskusije:</span><br/>
				
				 <blockquote>
			      {this.props.discussion.text}
			    </blockquote>
				
				
				
				</Card>
			</Col>

			</CollectionItem>
		)
	}
}