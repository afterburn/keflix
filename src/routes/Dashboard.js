import React from 'react'

import Loading from '../components/Loading'
import Header from '../components/Header'

import AuthContext from '../context/auth'

export default () => {
  const { loading, account, selectedUser } = React.useContext(AuthContext)
  
  if (loading || account == null || selectedUser == null) {
    return <Loading />
  }

  return <>
    <Header />
  </>
}