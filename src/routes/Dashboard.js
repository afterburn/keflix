import React from 'react'

import Header from '../components/Header'

import AuthContext from '../context/auth'

export default () => {
  const { loading, account } = React.useContext(AuthContext)
  
  if (loading || account == null) {
    return <>Loading</>
  }

  return <>
    <Header />
  </>
}