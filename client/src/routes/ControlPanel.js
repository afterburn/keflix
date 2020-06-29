import React from 'react'
import styled from 'styled-components'
import { Switch, Route, useLocation } from 'react-router-dom'

import Header from '../components/Header'
import Body from '../components/Body'
import Loading from '../components/Loading'
import ControlPanelMenu from '../components/ControlPanel/Menu'
import ControlPanelView from '../components/ControlPanel/View'

import AuthContext from '../context/auth'

export default styled(({ className }) => {
  const location = useLocation()
  const { loading, account, selectedUser } = React.useContext(AuthContext)
  
  if (loading || account == null || selectedUser == null) {
    return <Loading />
  }

  return <div className={className}>
    <Header />
    <Body spaceBetween>
      <ControlPanelMenu />
      <Switch>
        <Route path='/cp/:view/:page' component={ControlPanelView} />
        <Route path='/cp/:view' component={ControlPanelView} />
        <Route path='/cp' component={ControlPanelView} />
      </Switch>
    </Body>
  </div>
})`

`