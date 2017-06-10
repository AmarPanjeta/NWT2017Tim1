import React,{Component} from "react";
import {Row,Col,Input,Button,Chip,Tag,Icon} from 'react-materialize';
import $http from '../$http';

export class Registration extends Component{
  constructor(props){
    super(props);
    this.state={
      username:"",
      password:"",
      password_confirm:"",
      email:"",
      notifications:[]
    }
    this.handleRegistration=this.handleRegistration.bind(this);
    this.handleChangeUsername=this.handleChangeUsername.bind(this);
    this.handleChangePassword=this.handleChangePassword.bind(this);
    this.handleChangePasswordConfirm=this.handleChangePasswordConfirm.bind(this);
    this.handleChangeEmail=this.handleChangeEmail.bind(this);
  }
  handleRegistration(){
    $http.get("http://localhost:8081/users/search/userexists?username="+this.state.username+"&email="+this.state.email).then(
      (response)=>{
        if(response.entity==1){
          this.setState({notifications:["Username ili email je vec zauzet"]});
        }
        else{
          $http.post("http://localhost:8081/user/register",{username:this.state.username,password:this.state.password,email:this.state.email}).then(
            ()=>{
              this.setState({notifications:["Uspjesna registracija!"]});
              setTimeout(()=>{this.props.history.push("/") }, 2500);
            }
          )
        }
      }
    )

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
    const notifications=this.state.notifications.map((notification)=>(<Chip>
          			<Icon tiny>new_releases</Icon>
          			{notification}
          		</Chip>))
    return(<Row>
      <Col offset="s2" s={8}>
        <Input label="Username" s={12} onChange={this.handleChangeUsername}/>
        <Input type="email" label="Email" s={12} onChange={this.handleChangeEmail}/>
        <Input type="password" label="password" s={12} onChange={this.handleChangePassword}/>
        <Input type="password" label="Password confirm" s={12} onChange={this.handleChangePasswordConfirm}/>
        <br/>
        <Col s={12}>
        {notifications}
          {this.state.password!=this.state.password_confirm && this.state.password_confirm.length!=0 && <Chip>
                			<Icon tiny>new_releases</Icon>
                			Sifre se razlikuju!
                		</Chip>}
        </Col>
        <Button onClick={this.handleRegistration} disabled={this.state.password!=this.state.password_confirm && this.state.password_confirm.length!=0} >Registruj se</Button>
      </Col>
    </Row>);
  }
}
