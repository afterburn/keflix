import React from 'react'
import styled from 'styled-components'

import AuthContext from '../context/auth'

export default styled(({ className }) => {
  const { account } = React.useContext(AuthContext)

  return <div className={className}>
    <div className='avatar' style={{backgroundImage: `url('${account.avatar}')` }} />
  </div>
})`
margin-left: auto;
.avatar {
  width: 37px;
  height: 37px;
  background-size: cover;
  border: 3px solid ${props => props.theme.colors.white};
}

`