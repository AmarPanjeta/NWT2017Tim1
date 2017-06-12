import React,{Component} from "react";
import {User} from "./User";

var rest, mime, client;

rest = require('rest');
mime = require('rest/interceptor/mime');
client = rest.wrap(mime);

export class UserList extends Component{
	constructor(props) {
		super(props);
    this.state={users:[]}/*
		this.handleNavFirst = this.handleNavFirst.bind(this);
		this.handleNavPrev = this.handleNavPrev.bind(this);
		this.handleNavNext = this.handleNavNext.bind(this);
		this.handleNavLast = this.handleNavLast.bind(this);
		this.handleInput = this.handleInput.bind(this);*/
  }
  componentDidMount(){
    client({
      method:'GET',
      path:'http://localhost:8081/users'
    }).then(response => {
      return client({method: 'GET', path: 'http://localhost:8081/users'}).then(usersCollection=>{
        this.setState({
          users: usersCollection.entity._embedded.users,
          attributes: this.state.attributes
        })
      })
    })
  }
  render(){
    var users=this.state.users.map(user=>
    <User key={user.id} user={user}/>);
    return(
      <table>
        <tbody>
          <tr>
            <th>username</th>
            <th>email</th>
          </tr>
          {users}
        </tbody>
      </table>

    )
  }
}
