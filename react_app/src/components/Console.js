import React,{Component} from "react";
import {Button,Row,Col,Preloader,Card} from 'react-materialize';
import $http from '../$http';

export class Console extends Component {
  constructor(props) {
    super(props);
    this.state={code:"",result:"",status:"",action:false};
    this.handleCodeChange=this.handleCodeChange.bind(this);
    this.click=this.click.bind(this);
    this.closeResult=this.closeResult.bind(this);
  }

  render(){
    const style={
      resize:"none",
      backgroundColor: "black",
      fontFamily: "monospace",
      color:"green",
      minHeight:"500px",
      margin:"0px auto"
    };
    return(

      <Row>
        <Col s={8} offset={"s2"}>
          <textarea style={style} onChange={this.handleCodeChange}></textarea>
        </Col>
        <div style={{textAlign:"center"}}>
        {!this.state.action && this.state.result!="" && <Col s={8} offset={"s2"}>
      		<Card className='black lighten-1' textClassName='white-text' title='Result' actions={[<a onClick={this.closeResult}>close</a>]}>
            Status: {this.state.status}<br/>
            Output: {this.state.result}
      		</Card>
        </Col>
        }
        {!this.state.action && <Row><Col s={12}><Button onClick={this.click} style={{backgroundColor:"#ee6e73"}}>Pokreni</Button></Col></Row>}
        {this.state.action && <Row><Col s={12}><Preloader flashing/></Col></Row>}
        </div>
      </Row>);

  }

  handleCodeChange(e){
    this.setState({code:e.target.value});
    console.log(this.state.code);
  }

  click(){
    this.setState({action:true});
    $http.post("http://localhost:8099/compiler/run",{code:this.state.code}).then(
      response=>{
          setTimeout(()=>{
            this.setState({action:false,result:response.entity.result,status:response.entity.status});
          },1000);
        }
      )
  }

  closeResult(){
    this.setState({result:"",status:""})
  }
}
