import React,{Component} from 'react';
import {Button} from 'react-materialize';


export class Test extends Component{
  constructor(props){
    super(props);
    this.state={test:this.props.test};
  }

  render(){
    return(
      <tr>
        <td>{this.state.test.input}</td>
        <td>{this.state.test.output}</td>
        <td><Button floating className='magenta' waves='light' icon='delete' onClick={()=>{this.props.delete(this.state.test.id)}}/></td>
      </tr>
    );
  }
}
