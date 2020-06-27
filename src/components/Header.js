import React from 'react'
import styled from 'styled-components'

import Navigation from './Navigation'
import HeaderProfile from './HeaderProfile'

import SVG from './SVG'
import Logo from '../images/logo'

export default styled(({ className }) => {
  return <header className={className}>
    <SVG className='logo' image={<Logo />} />
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