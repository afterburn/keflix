import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import AuthContext from '../context/auth'

export default styled(({ className }) => {
  const { account } = React.useContext(AuthContext)

  return <div className={className}>
    <Link to='/browse/series'>Series</Link>
    <Link to='/browse/movies'>Movies</Link>
    {account.role === 1 && <Link to='/cp'>Control panel</Link>}
  </div>
})`
a {
  margin-right: ${props => props.theme.padding(4)};
}
`