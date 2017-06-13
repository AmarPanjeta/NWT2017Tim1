import React,{Component} from 'react';
import {Col,Card,Row} from 'react-materialize';
import $http from '../../$http';


export class ShowTask extends Component{
  constructor(props){
    super(props);
    this.state={task:{taskTitle:"",taskText:""},creator:{username:""}}
  }
  componentDidMount(){
    $http.get('http://localhost:8088/tasks/'+this.props.match.params.id).then(response=>{
      $http.get(response.entity._links.user.href).then(creatorResponse=>{
        this.setState({task:response.entity,creator:creatorResponse.entity});
      })
    })
  }
  render(){
    return(
      <Row>
      <Col offset="s1" s={10}>
      		<Card className='' textClassName='black-text' title={this.state.task.taskTitle} actions={[<a href='#'>This is a link</a>,<a href='#'>This is a link</a>,<a href='#'>This is a link</a>]}>
      		{this.state.task.taskText}
          <br/>
          <br/>
          <p className="right">Created by:{this.state.creator.username}</p>
      		</Card>
      </Col>
      </Row>
    );
  }
}
