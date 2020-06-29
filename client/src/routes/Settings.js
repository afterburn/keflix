import React from 'react'

import Header from '../components/Header'
import Body from '../components/Body'
import Loading from '../components/Loading'

import AuthContext from '../context/auth'

export default () => {
  const { loading, account, selectedUser } = React.useContext(AuthContext)
  
  if (loading || account == null || selectedUser == null) {
    return <Loading />
  }

  return <>
    <Header />
    <Body>
      Settings
    </Body>
  </>
}