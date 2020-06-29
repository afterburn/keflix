import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Navigation from './Navigation'
import HeaderProfile from './HeaderProfile'

import AuthContext from '../context/auth'

import SVG from './SVG'
import Logo from '../images/logo'

export default styled(({ className }) => {
  const { account, selectedUser } = React.useContext(AuthContext)

  return <header className={className}>
    <Link to={(account !== null && selectedUser !== null) ? '/browse' : '/'}>
      <SVG className='logo' image={<Logo />} />
    </Link>
    <Navigation />
    <HeaderProfile />
  </header>
})`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.padding(2, 4)};
  background: rgba(0, 0, 0, .2);

  .logo {
    width: 78px;
    min-width: 78px;
    height: 24px;
    min-height: 24px;
    margin-right: ${props => props.theme.padding(12)};
  }
`