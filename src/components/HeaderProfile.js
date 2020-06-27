import React from 'react'
import styled from 'styled-components'

import AuthContext from '../context/auth'

import { getUrl } from '../helpers/url-helper'

export default styled(({ className }) => {
  const { selectedUser } = React.useContext(AuthContext)

  const avatar = getUrl(`/avatars/${selectedUser.avatar}`)
  return <div className={className}>
    <div className='avatar' style={{ backgroundImage: `url('${avatar}')` }} />
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