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
    this.state={discussion:{title:'',description:'',regUser:{username:''},open:''},comments:[],interestedIn:false,show:false};
    this.promijeniStatus=this.promijeniStatus.bind(this);
    this.changeStatus=this.changeStatus.bind(this);
    this.showInput=this.showInput.bind(this);
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
 
 showInput(e){
   this.setState({show:!this.state.show});
 }


  changeStatus(e){

      if(this.state.interestedIn==true && localStorage["username"]!=null && localStorage["username"]!=undefined){
      client({
        method:'GET',
        path:'http://localhost:8082/discussion/deleteinterest?username='+localStorage["username"]+'&id='+this.props.match.params.id
      }).then(response=>{
        this.setState({interestedIn:false});
      })
    }else if(this.state.interestedIn==false && localStorage["username"]!=null && localStorage["username"]!=undefined){
      client({
        method:'GET',
        path:'http://localhost:8082/discussion/addinterest?username='+localStorage["username"]+'&id='+this.props.match.params.id
      }).then(response=>{
        this.setState({interestedIn:true});
      })
    }
  }

   
    componentDidMount(){
      client({
        method:'GET',
        path:'http://localhost:8082/discussion/get/'+this.props.match.params.id
      }).then(response=>{
        console.log("odgovor",response.entity);
                client({
                  method:'GET',
                  path:'http://localhost:8082/discussion/getcomments?discussionId='+this.props.match.params.id
                }).then(response1=>{

                  if(localStorage["username"]!=null && localStorage["username"]!=undefined){
                       client({
                        method:'GET',
                        path:'http://localhost:8082/discussion/isinterested?username='+localStorage["username"]+"&id="+this.props.match.params.id
                      }).then(response2=>{
                        this.setState({discussion:response.entity,comments:response1.entity,interestedIn:response2.entity});
                      })
                    }else{
                        this.setState({discussion:response.entity,comments:response1.entity});
                    }

               

                  

                })
        }
      )
    }


    render(){
    return(

      <Col m={6} s={12}>

      <Icon>account_circle</Icon>
          <span><b>{this.state.discussion.regUser.username}</b> |

          {this.state.discussion.open && localStorage["username"]!=this.state.discussion.regUser.username &&
          <span><b>Otvorena</b></span>
            }

          {this.state.discussion.open==false && localStorage["username"]!=this.state.discussion.regUser.username &&
              <span><b>Zatvorena</b></span>
            }


              {this.state.discussion.open==true && localStorage["username"]==this.state.discussion.regUser.username &&
          
            <Input name='on' type='switch' value='1' offLabel='Zatvorena' onLabel='Otvorena' onChange={this.promijeniStatus}/>
          
            }

          {this.state.discussion.open==false && localStorage["username"]==this.state.discussion.regUser.username &&
              
                <Input name='on' type='switch' value='0' offLabel='Zatvorena' onLabel='Otvorena' onChange={this.promijeniStatus} />
              
            }
          </span>

          {this.state.interestedIn==true &&
           <a className='btn btn-floating pulse right' onClick={this.changeStatus}> <Icon tiny >grade</Icon></a>
          }


           {this.state.interestedIn==false &&
        
            <span style={{cursor:'pointer'}} className="right" onClick={this.changeStatus}><Icon right >grade</Icon></span>

         
            }


        <Card className='teal darken-3' textClassName='white-text' title={'Naslov: '+this.state.discussion.title} actions={[<a style={{cursor:'pointer'}} onClick={this.showInput}>={'#'}>Dodaj Komentar</a>]}>
          {this.state.discussion.text}

         <hr/>
          <CommentList comments={this.state.comments}></CommentList>

        </Card>


        

      </Col>
      );
  }

}