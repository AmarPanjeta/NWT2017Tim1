import React,{Component} from "react";

var rest, mime, client;

rest = require('rest');
mime = require('rest/interceptor/mime');
client = rest.wrap(mime);

export class ShowDiscussion extends Component{
  constructor(props){
    super(props);
    this.state={discussion:{title:"",text:""}};
  }



    componentDidMount(){
    client({
      method:'GET',
      path:'http://localhost:8082/discussions/'+this.props.match.params.id
    }).then(
      response=>{
        console.log(response);
        this.setState({
          discussion:response.entity
        })
      }
    )
  }


    render(){
    return(<span><div>{this.state.discussion.title}</div>
    <div>{this.state.discussion.text}</div></span>);
  }

}