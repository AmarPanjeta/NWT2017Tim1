import React,{Component} from "react";
import '../../index.css';
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
    this.state={discussion:{title:'',description:'',regUser:{username:''},open:''},comments:[],interestedIn:false,show:false,tekst:'',switch:false};
    this.promijeniStatus=this.promijeniStatus.bind(this);
    this.changeStatus=this.changeStatus.bind(this);
    this.showInput=this.showInput.bind(this);
    this.addComment=this.addComment.bind(this);
    this.deleteComment=this.deleteComment.bind(this);
  }


   deleteComment(id){
      if(localStorage["username"]!=null && localStorage["username"]!='undefined'){
        client({
          method:'GET',
          path:'http://localhost:8082/comment/removecomment?username='+localStorage["username"]+'&id='+id
        }).then(response=>{

            client({
              method:'GET',
              path:'http://localhost:8082/discussion/getcomments?discussionId='+this.props.match.params.id
                   }).then(response1=>{
                      this.setState({comments:response1.entity,tekst:'',show:false});
            })
               
        })
      }
    }

  promijeniStatus(e){
    client({
      method:'GET',
      path:'http://localhost:8082/discussion/changestatus?id='+this.props.match.params.id+'&username='+localStorage["username"]
    }).then(
        response=>{
          
            client({
              method:'GET',
              path:'http://localhost:8082/discussion/get/'+this.props.match.params.id
            }).then(response1=>{
              if(response1.open==true){
                this.setState({discussion:response1.entity,switch:response1.entity.open});
              }else{
                this.setState({discussion:response1.entity,switch:response1.entity.open});
              }
              console.log("diskus",this.state.discussion.open);
              console.log("svic",this.state.switch);
            })

        

        }
    )
  }
 
 showInput(e){
   this.setState({show:!this.state.show});
 }

addComment(e){
  e.preventDefault();
  client({
    method:'POST',
    headers:{'Content-Type':'application/json'},
    path:'http://localhost:8082/comment/addcomment',
    entity:{username:localStorage["username"],tekst:this.state.tekst,idDiskusije:this.props.match.params.id}
  }).then(response=>{

     client({
      method:'GET',
      path:'http://localhost:8082/discussion/getcomments?discussionId='+this.props.match.params.id
            }).then(response1=>{
              this.setState({comments:response1.entity,tekst:'',show:false});
            })

  })

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
                        this.setState({discussion:response.entity,comments:response1.entity,interestedIn:response2.entity,switch:response.entity.open});
                      })
                    }else{
                        this.setState({discussion:response.entity,comments:response1.entity,switch:response.entity.open});
                    }

               

                  

                })
        }
      )
    }


    render(){

      var actions=[];

      if(!this.state.show && this.state.discussion.open==true) actions.push(<a style={{cursor:"pointer"}} onClick={()=>{this.setState({show:true})}}>Unesi komentar</a>);
      if(this.state.show && this.state.discussion.open==true){
          actions.push(<a style={{cursor:"pointer"}} onClick={(e)=>{e.preventDefault();this.setState({show:false,tekst:""})}}>Sakrij polje za komentar</a>)
          actions.push(<a style={{cursor:"pointer"}} onClick={this.addComment}>Dodaj komentar</a>)
        }
        actions.push(<a href="/discussions">Nazad</a>);

    return(



      <Col m={6} s={12}>

       <h3 style={{color:'#00695c'}} className='center-align'>Prikaz pojedinacne diskusije</h3>
     <hr/>

      <Icon>account_circle</Icon>
          <span ><b>{this.state.discussion.regUser.username}</b> | <i>Status: </i>

          {this.state.discussion.open && localStorage["username"]!=this.state.discussion.regUser.username &&
          <span><b>Otvorena</b></span>
            }

          {this.state.discussion.open==false && localStorage["username"]!=this.state.discussion.regUser.username &&
              <span><b>Zatvorena</b></span>
            }


          { localStorage["username"]==this.state.discussion.regUser.username &&
          <span style={{display:'inline-block'}}>

            <Input name='on' type='switch' offLabel='Zatvorena'  onLabel='Otvorena' onChange={this.promijeniStatus} checked={this.state.switch}/>
          </span>
            }

      
          </span>

          {this.state.interestedIn==true &&
           <a className='btn btn-floating pulse right' onClick={this.changeStatus}> <Icon tiny >grade</Icon></a>
          }


           {this.state.interestedIn==false &&
        
            <span style={{cursor:'pointer'}} className="right" onClick={this.changeStatus}><Icon right >grade</Icon></span>

         
            }

        <Card  style={{color:'#00695c'}} actions={actions}>
        <h5 style={{color:'#00695c'}}>{'Naslov: '+this.state.discussion.title} </h5>
          {this.state.discussion.text}

         <hr/>
          <CommentList comments={this.state.comments} delete={this.deleteComment}></CommentList>

          {this.state.show && this.state.discussion.open==true &&
            <Row>
              <div className="input-field col s12" >
                <textarea className="materialize-textarea" onChange={(e)=>{this.setState({tekst:e.target.value})}}></textarea>
                <label >Komentar</label>
              </div>
            </Row>
          }

         

        </Card>

   
        

      </Col>
      );
  }

}