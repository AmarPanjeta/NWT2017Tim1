import React,{Component} from 'react';
import Materialize,{Row,Col,Card,Input,Button,Icon,Table} from 'react-materialize';
import {Test} from './Test';
import $http from '../../$http';


export class EditTask extends Component {
  constructor(props){
    super(props);
    this.state={
      task:{
        taskTitle:"",
        taskText:"",
        creatorsSolution:""
      },
      tests:[],
      creator:{},
      newInput:"",
      newOutput:""
    }
    this.handleChangeText=this.handleChangeText.bind(this);
    this.handleChangeTitle=this.handleChangeTitle.bind(this);
    this.handleChangeSolution=this.handleChangeSolution.bind(this);
    this.handleSaveChanges=this.handleSaveChanges.bind(this);
    this.handleDeleteTest=this.handleDeleteTest.bind(this);
    this.handleChangeInput=this.handleChangeInput.bind(this);
    this.handleChangeOutput=this.handleChangeOutput.bind(this);
    this.handleAddTest=this.handleAddTest.bind(this);
  }
  componentDidMount(){
    $http.get('http://localhost:8088/tasks/'+this.props.match.params.id).then(response=>{
      $http.get(response.entity._links.user.href).then(creatorResponse=>{
        $http.get("http://localhost:8088/tests/search/getAllTaskTests?id="+this.props.match.params.id).then(testsResponse=>{
          this.setState({task:response.entity,creator:creatorResponse.entity,tests:testsResponse.entity._embedded.tests});
        })
      })
    })
  }
  handleChangeTitle(e){
    this.setState({task:{taskTitle:e.target.value,taskText:this.state.task.taskText,creatorsSolution:this.state.task.creatorsSolution}});
  }
  handleChangeText(e){
    this.setState({task:{taskText:e.target.value,taskTitle:this.state.task.taskTitle,creatorsSolution:this.state.task.creatorsSolution}});
  }
  handleChangeSolution(e){
    this.setState({task:{taskText:this.state.task.taskText,taskTitle:this.state.task.taskTitle,creatorsSolution:e.target.value}});
  }
  handleSaveChanges(e){
    e.preventDefault();
    $http.put("http://localhost:8088/tasks/"+this.props.match.params.id,this.state.task);
  }
  handleChangeInput(e){
    this.setState({newInput:e.target.value});
  }
  handleChangeOutput(e){
    this.setState({newOutput:e.target.value});
  }
  handleDeleteTest(id){
    $http.delete("http://localhost:8088/tests/"+id).then(response=>{
      $http.get("http://localhost:8088/tests/search/getAllTaskTests?id="+this.props.match.params.id).then(response2=>{
        this.setState({tests:response2.entity._embedded.tests,newInput:"",newOuput:""});
      })
    })
  }
  handleAddTest(e){
    $http.post("http://localhost:8088/task/"+this.props.match.params.id+"/addTest",
    {input:this.state.newInput,output:this.state.newOutput, time_ms:10000}).then(
      response=>{
        $http.get("http://localhost:8088/tests/search/getAllTaskTests?id="+this.props.match.params.id).then(response2=>{
          this.setState({tests:response2.entity._embedded.tests,newInput:"",newOutput:""});
        })
      }
    )
  }

  render(){
    var actions=[];
    if(localStorage.hasOwnProperty("username")) actions.push(<a style={{cursor:"pointer"}} onClick={this.handleSaveChanges}>Sacuvaj izmjene</a>);
    actions.push(<a href="/tasks">Nazad</a>)
    var tests=this.state.tests.map((test)=>(<Test test={test} delete={this.handleDeleteTest}/>));
    return(
      <Row>
      <Col offset="s1" s={10}>
          <Card className='' textClassName='black-text' actions={actions}>
          <Row>
            <h3 className={"center-align"} style={{color:"#26a69a"}}>Izmjena taska</h3>
            <Input s={6} placeholder="Naslov zadatka" value={this.state.task.taskTitle} onChange={this.handleChangeTitle}/>
            <div className="input-field col s12">
              <textarea className="materialize-textarea" placeholder="Tekst zadatka" label="Tekst zadatka" value={this.state.task.taskText}  onChange={this.handleChangeText}></textarea>
            </div>
            <Row>
              <div className="input-field col s12">
                <textarea className="materialize-textarea" placeholder='Rjesenje' value={this.state.task.creatorsSolution} onChange={this.handleChangeSolution}></textarea>
              </div>
            </Row>
            <Table centered>
            	<thead>
            		<tr>
            			<th data-field="id">Ulaz</th>
            			<th data-field="name">Ispis</th>
            			<th data-field="price">Opcije</th>
            		</tr>
            	</thead>
            	<tbody>
                {tests}
                <tr>
                  <td><Input s={12} placeholder="Novi ulaz" value={this.state.newInput} onChange={this.handleChangeInput}/></td>
                  <td><Input s={12} placeholder="Novi ispis" value={this.state.newOutput} onChange={this.handleChangeOutput}/></td>
                  <td><Button floating className='magenta' waves='light' icon='add' onClick={this.handleAddTest} disabled={this.state.newInput=="" || this.state.newOutput==""}/></td>
                </tr>
            	</tbody>
            </Table>
          </Row>
          </Card>
      </Col>
      </Row>
    );
  }

}
