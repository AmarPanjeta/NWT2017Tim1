import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


import {UserList} from "./components/users/UserList"
import {CreateDialog} from "./components/CreateDialog"
import {ShowUser} from "./components/users/ShowUser"

import {DiscussionList} from "./components/discussions/DiscussionList"
import {ShowDiscussion} from "./components/discussions/ShowDiscussion"

import {Header} from "./components/Header"
import {Login} from "./components/Login"
import {Registration} from "./components/Registration"

import $http from './$http';
import {Console} from './components/Console';


//import rest from 'rest-js'

var rest, mime, client;
rest = require('rest');
mime = require('rest/interceptor/mime');
client = rest.wrap(mime);

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      users:[],
      logged:localStorage.hasOwnProperty("token"),
      token:localStorage["token"]!=undefined?localStorage["token"]:"",
      username:localStorage["username"]
    };

    this.onCreate = this.onCreate.bind(this);
    this.onDelete=this.onDelete.bind(this);
    this.printajText=this.printajText.bind(this);
    this.handleLogout=this.handleLogout.bind(this);
    this.handleLogin=this.handleLogin.bind(this);

  }
  componentDidMount(){/*
    console.log(this.state.stanje);
    client({method: 'GET', path: 'http://localhost:8081/users'
  }).then(usersCollection => {
			return client({
				method: 'GET',
				path: usersCollection.entity._links.profile.href,
				headers: {'Accept': 'application/schema+json'}
			}).then(schema => {
				this.schema = schema.entity;
				return usersCollection;
			});
		}).then(usersCollection => {
			  this.setState({
				users: usersCollection.entity._embedded.users,
				attributes: Object.keys(this.schema.properties)});
        console.log(this.state.users);
    });*/
  }

  onCreate(newEmployee) {
  client({
        method: 'POST',
        path:"http://localhost:8081/users",
        entity: newEmployee,
        headers: {'Content-Type': 'text/plain'}
      }).then(response => {
        return client({method: 'GET', path: 'http://localhost:8081/users'}).then(usersCollection=>{
          this.setState({
            users: usersCollection.entity._embedded.users,
            attributes: this.state.attributes
          })
        })
      });
  }

  onDelete(id){
    console.log("radi "+id);
  }

  printajText(){
    console.log("printam text");
  }

  handleLogin(username,password){
    $http.post("http://localhost:8081/user/login",{username:username,password:password}).then(
      response=>{
        console.log(response.entity);
        this.setState({logged:true,token:response.entity,username:username});
        localStorage.setItem("token",response.entity);
        localStorage.setItem("username",username);
      },reason=>{
        console.log(reason);
      }
    );
  }

  handleLogout(){
    this.setState({logged:false,token:""});
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  }

  render() {
    return(
      <Router>

          <div>
            <Header logged={this.state.logged} logout={this.handleLogout}/>
            <Route exact path="/users" component={UserList}/>
            <Route path="/users/:id" component={ShowUser}/>
            <Route exact path="/discussions" component={DiscussionList}/>
            <Route path="/discussions/:id" component={ShowDiscussion}/>
            <Route path="/login" render={(props) => <Login printaj={this.handleLogin} {...props} />}/>
            <Route path="/register" component={Registration}/>
            <Route path="/console" component={Console}/>
          </div>
      </Router>
    )
  }
}

class Main extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(<div>{this.props.match.params.id}</div>)
  }
}

export default App;
