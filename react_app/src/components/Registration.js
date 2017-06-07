import React,{Component} from "react";
import {Row,Col,Input} from 'react-materialize';

export class Registration extends Component{
  render(){
    return(<Row>
      <Col offset="s2" s={8}>
        <Input label="Username" s={12}/>
        <Input type="password" label="password" s={12}/>
        <Input type="password" label="Password confirm" s={12}/>
        <Input type="email" label="Email" s={12}/>
      </Col>
    </Row>);
  }
}
