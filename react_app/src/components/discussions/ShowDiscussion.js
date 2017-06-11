import React,{Component} from "react";
import { Link } from 'react-router-dom'
import { Button, Card, Row, Col, Collection,CollectionItem,Icon,Input } from 'react-materialize';
import {CommentList} from "./CommentList";


var rest, mime, client;

rest = require('rest');
mime = require('rest/interceptor/mime');
client = rest.wrap(mime);

export class ShowDiscussion extends Component{
  constructor(props){
    super(props);
    this.state={discussion:{title:'',description:'',regUser:'',open:''},comments:[]};
    this.promijeniStatus=this.promijeniStatus.bind(this);
  }

  promijeniStatus(e){
    client({
      method:'GET',
      path:'http://localhost:8082/discussion/changestatus?id='+this.props.match.params.id+'&username='+localStorage["username"]
    }).then(
        response=>{
          console.log("promjena statusa:",this.state.discussion);
        }
    )
  }
   
    componentDidMount(){
      client({
        method:'GET',
        path:'http://localhost:8082/discussions/'+this.props.match.params.id+'/regUser'
      }).then(response=>{
        console.log("odgovor",response);
                client({
                  method:'GET',
                  path:'http://localhost:8082/discussion/getcomments?discussionId='+this.props.match.params.id
                }).then(response1=>{
                  this.setState({user:response.entity,comments:response1.entity});
                })
        }
      )
    }


    render(){
    return(

      <Col m={6} s={12}>

      <Icon>account_circle</Icon>
          <span><b>{this.state.discussion.regUser.username}</b> |
              {this.state.discussion.open==true &&
          
            <Input name='on' type='switch' value='1' offLabel='Zatvorena' onLabel='Otvorena'/>
          
            }

          {this.state.discussion.open==false && 
              
                <Input name='off' type='switch' value='0' offLabel='Zatvorena' onLabel='Otvorena' onChange={this.promijeniStatus} />
              
            }
          </span>


        <Card className='#00695c teal darken-3' textClassName='white-text' title={this.state.discussion.title} actions={[<Link to={'/discussions/'}>Prikazi komentare</Link>]}>
          {this.state.discussion.text}
        </Card>

        <CommentList comments={this.state.comments}></CommentList>

      </Col>
      );
  }

}