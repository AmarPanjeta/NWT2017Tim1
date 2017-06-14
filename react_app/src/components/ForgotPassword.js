import React,{Component} from 'react';
import {Button,Col,Input,Row,Icon} from 'react-materialize';
import $http from '../$http';

export class ForgotPassword extends Component{
  constructor(props){
    super(props);
    this.state={
      email:"",
      stringCode:"",
      password:"",
      password_confirm:"",
      step:0,
      error:""
    }
    this.handleChangeEmail=this.handleChangeEmail.bind(this);
    this.handleChangePassword=this.handleChangePassword.bind(this);
    this.handleChangePasswordConfirm=this.handleChangePasswordConfirm.bind(this);
    this.handleChangeStringCode=this.handleChangeStringCode.bind(this);
    this.requestResetCode=this.requestResetCode.bind(this);
    this.checkResetCode=this.checkResetCode.bind(this);
    this.confirmNewPassword=this.confirmNewPassword.bind(this);
  }
  handleChangeEmail(e){
    this.setState({email:e.target.value,error:""});
  }
  handleChangeStringCode(e){
    this.setState({stringCode:e.target.value,error:""});
  }
  handleChangePassword(e){
    this.setState({password:e.target.value});
  }
  handleChangePasswordConfirm(e){
    this.setState({password_confirm:e.target.value});
  }
  requestResetCode(){
    $http.get("http://localhost:8081/user/sendrequest?email="+this.state.email).then(
      response=>{
        this.setState({step:1,error:""});
      }).catch(error=>{
        this.setState({error:error.message});
      })
  }
  checkResetCode(){
    $http.get("http://localhost:8081/user/checkresetcode/"+this.state.stringCode).then(
      response=>{
        this.setState({step:2,error:""});
      }).catch(error=>{
        this.setState({error:error.message});
      })
  }
  confirmNewPassword(){
    $http.post("http://localhost:8081/user/resetpassword/"+this.state.stringCode,{password:this.state.password,passwordRepeat:this.state.password_confirm}).then(
      response=>{
        this.setState({step:3,error:""});
      }).catch(error=>{
        this.setState({error:error.message});
      })
  }
  render(){
      var buttonText=["Resetuj sifru","Potvrdi kod","Sacuvaj novu sifru","Povratak na login"];
      var instructions=["Unesite vas email.","Poslan vam je mail sa kodom za ponovni unos sifre. Unesite kod.","Unesite novu sifru. Zatim je radi potvrde unesite jos jednom.","Uspjesno ste postavili sifru. Mozete se vratiti na login."]
      var actions=[this.requestResetCode,this.checkResetCode,this.confirmNewPassword,()=>{this.props.history.push("/login")}];
      return(
        <Row>
          <Col offset="s2" s={8}>
            <h3>Zaboravljena sifra</h3>
            <blockquote>
              {this.state.error!=""?this.state.error:instructions[this.state.step]}
            </blockquote>
            {this.state.step==0 && <Input label="Email" s={12} onChange={this.handleChangeEmail}/>}
            {this.state.step==1 && <Input label="Kod" s={12} onChange={this.handleChangeStringCode}/>}
            {this.state.step==2 && <Input type="password" label="password" s={12} onChange={this.handleChangePassword}/>}
            {this.state.step==2 && <Input type="password" label="Password confirm" s={12} onChange={this.handleChangePasswordConfirm}/>}
            <Button waves='light' onClick={actions[this.state.step]} disabled={this.state.step==2 && (this.state.password=="" || this.state.password!=this.state.password_confirm)}>{buttonText[this.state.step]}<Icon left>check</Icon></Button>
          </Col>
        </Row>
      )
  }
}
