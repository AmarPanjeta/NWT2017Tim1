import React from 'react'
import { Link } from 'react-router-dom'
import {Navbar, NavItem} from 'react-materialize'

export const Header = () => (
  <header>
    <Navbar brand='logo' right>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/users'>Users</Link></li>
      <li><Link to='/discussions'>Discussions</Link></li>
    </Navbar>
  </header>)
