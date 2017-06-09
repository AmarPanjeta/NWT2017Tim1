import React from 'react'
import { Link } from 'react-router-dom'
import {Navbar, NavItem} from 'react-materialize'

export const Header = (props) => (
  <header>
    <Navbar brand='logo' right>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/console'>Web console</Link></li>
      <li><Link to='/users'>Users</Link></li>
      <li><Link to='/discussions'>Discussions</Link></li>
      {!props.logged &&<li><Link to='/register'>Register</Link></li>}
      {!props.logged &&<li><Link to='/login'>Login</Link></li>}
      {props.logged && <li onClick={()=>{if(props.logout!=undefined)props.logout()}}><a>Logout</a></li>}
    </Navbar>
  </header>)
