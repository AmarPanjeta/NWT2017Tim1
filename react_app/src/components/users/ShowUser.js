import React,{Component} from "react";

var rest, mime, client;
rest = require('rest');
mime = require('rest/interceptor/mime');
client = rest.wrap(mime);

export class ShowUser extends Component{
  constructor(props){
    super(props);
    this.state={user:{username:"",email:""}};
  }
  componentDidMount(){
    client({
      method:'GET',
      path:'http://localhost:8081/users/'+this.props.match.params.id
    }).then(
      response=>{
        console.log(response);
        this.setState({
          user:response.entity
        })
      }
    )
  }
  render(){
    return(<span><div>{this.state.user.username}</div>
    <div>{this.state.user.email}</div></span>);
  }
}
