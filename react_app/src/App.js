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


//import rest from 'rest-js'

var rest, mime, client;
rest = require('rest');
mime = require('rest/interceptor/mime');
client = rest.wrap(mime);

class App extends Component {
  constructor(props){
    super(props);
    this.state={users:[],attributes:[],schema:[]};
    this.onCreate = this.onCreate.bind(this);
    this.onDelete=this.onDelete.bind(this);
    //this.onDelete = this.onDelete.bind(this);
  }
  componentDidMount(){
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
});
  }

  onCreate(newEmployee) {
  client({
        method: 'POST',
        path:"http://localhost:8081/users",
        entity: newEmployee,
        headers: {'Content-Type': 'application/json'}
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
    /*
    client({
      method:'DELETE',
      path:'http://localhost:8081/users/'+id
    }).then(response => {
      return client({method: 'GET', path: 'http://localhost:8081/users'}).then(usersCollection=>{
        this.setState({
          users: usersCollection.entity._embedded.users,
          attributes: this.state.attributes
        })
      })
    })*/
  }

  render() {
    return(
      <Router>

          <div>
          <Header/>
          <Route exact path="/users" component={UserList}/>
          <Route path="/users/:id" component={ShowUser}/>
          <Route exact path="/discussions" component={DiscussionList}/>
          <Route path="/discussions/:id" component={ShowDiscussion}/>
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

/*
<div className="App">
  <div className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h2>Welcome to React</h2>
  </div>
  <p className="App-intro">
    To get started, edit <code>src/App.js</code> and save to reload.
  </p>
  <CreateDialog attributes={this.state.attributes} onCreate={this.onCreate}/>
  <UserList users={this.state.users}/>
</div>*/
