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
    this.sendSolution=this.sendSolution.bind(this);
  }
  componentDidMount(){
    $http.get('http://localhost:8088/tasks/'+this.props.match.params.id).then(response=>{
      $http.get(response.entity._links.user.href).then(creatorResponse=>{
        this.setState({task:response.entity,creator:creatorResponse.entity});
      })
    })
  }
  sendSolution(e){
    e.preventDefault();
    $http.get('http://localhost:8088/tasks/'+this.props.match.params.id+"/tests").then(
      response=>{
        var tests=[];
        response.entity._embedded.tests.map((test)=>{tests.push(test.input);tests.push(test.output);})
        $http.post('http://localhost:8099/compiler/runwithat',{code:this.state.solution,username:localStorage["username"],tests:tests});
      }
    )
  }
  render(){
    var actions=[];
    if(!this.state.showConsole && localStorage.hasOwnProperty("username")) actions.push(<a style={{cursor:"pointer"}} onClick={(e)=>{e.preventDefault();this.setState({showConsole:true})}}>Unesi rjesenje</a>);
    if(this.state.showConsole && localStorage.hasOwnProperty("username")){
      actions.push(<a style={{cursor:"pointer"}} onClick={(e)=>{e.preventDefault();this.setState({showConsole:false,solution:""})}}>Sakrij polje za rjesenje</a>)
      actions.push(<a style={{cursor:"pointer"}} onClick={this.sendSolution}>Pokreni rjesenje</a>)
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
          <br/>
          {!localStorage.hasOwnProperty("username") &&
          <p  style={{color:"#ce93d8"}} className="center-align">Za rjesavanje ovog zadatka je potrebno biti logovan.</p>
          }
      		</Card>
      </Col>
      </Row>
    );
  }
}
