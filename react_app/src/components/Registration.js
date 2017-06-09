import React,{Component} from "react";
import {Row,Col,Input,Button} from 'react-materialize';

export class Registration extends Component{
  constructor(props){
    super(props);
    this.state={
      username:"",
      password:"",
      password_confirm:"",
      email:""
    }
    this.handleRegistration=this.handleRegistration.bind(this);
    this.handleChangeUsername=this.handleChangeUsername.bind(this);
    this.handleChangePassword=this.handleChangePassword.bind(this);
    this.handleChangePasswordConfirm=this.handleChangePasswordConfirm.bind(this);
    this.handleChangeEmail=this.handleChangeEmail.bind(this);
  }
  handleRegistration(){
  }
  handleChangeUsername(e){
    this.setState({username:e.target.value});
  }
  handleChangePassword(e){
    this.setState({password:e.target.value});
  }
  handleChangePasswordConfirm(e){
    this.setState({password_confirm:e.target.value});
  }
  handleChangeEmail(e){
    this.setState({email:e.target.value});
  }
  render(){
    return(<Row>
      <Col offset="s2" s={8}>
        <Input label="Username" s={12} onChange={this.handleChangeUsername}/>
        <Input type="email" label="Email" s={12} onChange={this.handleChangeEmail}/>
        <Input type="password" label="password" s={12} onChange={this.handleChangePassword}/>
        <Input type="password" label="Password confirm" s={12} onChange={this.handleChangePasswordConfirm}/>
        {this.state.password!=this.state.password_confirm && this.state.password_confirm.length!=0 && <Input s={12}  defaultValue="Unijeli ste razlicite sifre!" disabled />}
        <br/>
        <Button onClick={()=>{this.props.history.push("/")}} >cao!</Button>
      </Col>
    </Row>);
  }
}
