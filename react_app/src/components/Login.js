import React,{Component} from "react";
import ReactDOM from 'react-dom';
import {Row,Input,Col,Button,Icon,Modal,Chip} from 'react-materialize';
import Klasa from '../klasa';
import $http from '../$http';

export class Login extends Component{
  constructor(props){
    super(props);
    this.state={
      username:"",
      password:"",
      notifications:[]
    }
    this.onLogin=this.onLogin.bind(this);
    this.handleChangePassword=this.handleChangePassword.bind(this);
    this.handleChangeUsername=this.handleChangeUsername.bind(this);
  }
  render(){
    const notifications=this.state.notifications.map((notification)=>(<Chip>
                <Icon tiny>new_releases</Icon>
                {notification}
              </Chip>))
    return(<Row>
      <Col offset="s2" s={8}>
		    <Input label="Username" s={12} onChange={this.handleChangeUsername}/>
        <Input type="password" label="password" s={12} onChange={this.handleChangePassword}/>
        <Col s={12}>
        {notifications}
        </Col>
        <Button waves='light' onClick={this.onLogin}>button<Icon left>cloud</Icon></Button>
      </Col>
      <br/>
      <div>

      </div>
      <Modal
	header='Modal Header'
	trigger={
		<Button waves='light'>MODAL</Button>
	}>
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
</Modal>
    </Row>);
  }

  handleChangePassword(event){
  this.setState({password: event.target.value});
  }
  handleChangeUsername(event){
    this.setState({username: event.target.value});
  }

  onLogin(){
    this.props.printaj(this.state.username,this.state.password,this);
  }

}
