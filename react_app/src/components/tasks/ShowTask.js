import React,{Component} from 'react';
import {Col,Card,Row} from 'react-materialize';
import $http from '../../$http';


export class ShowTask extends Component{
  constructor(props){
    super(props);
    this.state={
      task:{taskTitle:"",taskText:""},
      creator:{username:""},
      solution:"",
      showConsole:false
    }
  }
  componentDidMount(){
    $http.get('http://localhost:8088/tasks/'+this.props.match.params.id).then(response=>{
      $http.get(response.entity._links.user.href).then(creatorResponse=>{
        this.setState({task:response.entity,creator:creatorResponse.entity});
      })
    })
  }
  render(){
    var actions=[];
    if(!this.state.showConsole) actions.push(<a style={{cursor:"pointer"}} onClick={()=>{this.setState({showConsole:true})}}>Unesi rjesenje</a>);
    if(this.state.showConsole){
      actions.push(<a style={{cursor:"pointer"}} onClick={(e)=>{e.preventDefault();this.setState({showConsole:false,solution:""})}}>Sakrij polje za rjesenje</a>)
      actions.push(<a style={{cursor:"pointer"}} onClick={(e)=>{e.preventDefault();this.setState({showConsole:false})}}>Pokreni rjesenje</a>)
    }
    actions.push(<a href="/tasks">Nazad</a>)
    return(
      <Row>
      <Col offset="s1" s={10}>
      		<Card className='' textClassName='black-text' title={this.state.task.taskTitle} actions={actions}>
      		{this.state.task.taskText}
          <br/>
          {this.state.showConsole &&
            <Row>
              <div className="input-field col s12">
                <textarea className="materialize-textarea" onChange={(e)=>{this.setState({solution:e.target.value})}}></textarea>
                <label >Rjesenje</label>
              </div>
            </Row>
          }
          <br/>
          <p className="right">Created by:{this.state.creator.username}</p>

      		</Card>
      </Col>
      </Row>
    );
  }
}
