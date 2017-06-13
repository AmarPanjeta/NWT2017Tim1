import React,{Component} from "react";
import {Link} from 'react-router-dom';
import {CollapsibleItem,Collapsible,Row,Col,Collection,CollectionItem,Badge,Icon,Input,Button} from 'react-materialize';
import $http from '../../$http';

export class TaskList extends Component{
  constructor(props){
    super(props);
    this.state={tasks:[],activeTab:1,task:{taskTitle:"",taskText:""}};
    this.handleAllTasksClick=this.handleAllTasksClick.bind(this);
    this.handleMyTasksClick=this.handleMyTasksClick.bind(this);
    this.handleNewTask=this.handleNewTask.bind(this);
    this.handleChangeText=this.handleChangeText.bind(this);
    this.handleChangeTitle=this.handleChangeTitle.bind(this);
    this.handleCreateTask=this.handleCreateTask.bind(this);
    this.handleAbortCreateTask=this.handleAbortCreateTask.bind(this);
  }
  componentDidMount(){
    $http.get('http://localhost:8088/tasks').then(response=>{
      this.setState({tasks:response.entity._embedded.tasks});
    })
  }
  handleAllTasksClick(e){
    if(e!=null) e.preventDefault();
    $http.get('http://localhost:8088/tasks').then(response=>{
      this.setState({tasks:response.entity._embedded.tasks,activeTab:1,task:{taskTitle:"",taskText:""}});
    })
  }
  handleMyTasksClick(e){
    e.preventDefault();
    $http.get('http://localhost:8088/users/search/findByUsername?username='+localStorage["username"]).then(response=>{
      $http.get('http://localhost:8088/tasks/search/getAllUserTasks?id='+response.entity.id).then(fResponse=>{
        this.setState({tasks:fResponse.entity._embedded.tasks,activeTab:2,task:{taskTitle:"",taskText:""}});
      })
    })
  }
  handleNewTask(e){
    e.preventDefault();
    this.setState({tasks:[],activeTab:3});
  }
  handleChangeTitle(e){
    this.setState({task:{taskTitle:e.target.value,taskText:this.state.task.taskText}});
  }
  handleChangeText(e){
    this.setState({task:{taskText:e.target.value,taskTitle:this.state.task.taskTitle}});
  }
  handleCreateTask(e){
    $http.get('http://localhost:8088/users/search/findByUsername?username='+localStorage["username"]).then(response=>{
      var entity=this.state.task;
      entity.user=response.entity._links.self.href;

      $http.post('http://localhost:8088/tasks',entity).then(fResponse=>{
        this.handleAllTasksClick(null);
      })
    })
  }
  handleAbortCreateTask(e){
    this.handleAllTasksClick(null);
  }

  render(){
    if(this.state.activeTab!=3){
      var tasks=this.state.tasks.map((task)=>(
        <CollapsibleItem header={task.taskTitle} icon='whatshot'>
          {task.taskText}
          <br/>
          <br/>
          <Row>
          <Col s={3}>
            <Link to={'/tasks/'+task.id}>Detaljno</Link>
          </Col>
          <Col s={3}>
            {this.state.activeTab==2 &&  <Link to={'/edittask/'+task.id}> Izmijeni task </Link>}
          </Col>
          <Col s={3}>
            {this.state.activeTab==2 &&  <Link to={'/tasks/'+task.id}> Tasks </Link>}
          </Col>
        </Row>
        </CollapsibleItem>
      ));
    }
    var logged=localStorage.hasOwnProperty("username");
    var navigation=[];
    navigation.push(<CollectionItem href="#!" onClick={this.handleAllTasksClick} active={this.state.activeTab==1}>
      Svi taskovi  {this.state.activeTab==1 && <Badge>{this.state.tasks.length}</Badge>}
    </CollectionItem>);
    if(localStorage.hasOwnProperty("username")) navigation.push(<CollectionItem href="#!" onClick={this.handleMyTasksClick} active={this.state.activeTab==2}>
     Moji taskovi {this.state.activeTab==2 && <Badge>{this.state.tasks.length}</Badge>}
    </CollectionItem>);
    if(localStorage.hasOwnProperty("username")) navigation.push(        	<CollectionItem href="#!" onClick={this.handleNewTask} active={this.state.activeTab==3}>
            		Dodaj task <Icon tiny right>queue</Icon>
            	</CollectionItem>);
    return(

      <Row>
        <Col s={3}>
        <h3>Navigacija</h3>
        <Collection>
          {navigation}
        </Collection>
        </Col>
        {
          this.state.activeTab!=3 &&
          <Col s={8}>
            <h3 className={"center-align"} style={{color:"#039be5"}}>{this.state.activeTab==1?"Aktuelni zadaci":"Moji zadaci"}</h3>
            <Collapsible popout>
              {tasks}
            </Collapsible>
          </Col>
        }
        {
          this.state.activeTab==3 &&
          <Col s={8}>
            <Row>
              <h3 className={"center-align"} style={{color:"#26a69a"}}>Dodavanje novog taska</h3>
          		<Input s={6} label="Naslov zadatka" onChange={this.handleChangeTitle}/>
              <div className="input-field col s12">
                <textarea className="materialize-textarea" onChange={this.handleChangeText}></textarea>
                <label >Tekst zadatka</label>
              </div>
              <Col s={6}>
                <Button waves='light' onClick={this.handleCreateTask} disabled={this.state.task.taskTitle.length==0 || this.state.task.taskText.length==0}>dodaj<Icon left>done</Icon></Button>
              </Col>
              <Col s={6}>
                <Button waves='light' onClick={this.handleAbortCreateTask}>odustani<Icon left>exit_to_app</Icon></Button>
              </Col>
            </Row>
          </Col>
        }
      </Row>
    )
  }
}
