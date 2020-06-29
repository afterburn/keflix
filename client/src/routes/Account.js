import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import AuthContext from '../context/auth'
import Loading from '../components/Loading'
import Body from '../components/Body'

import { getUrl } from '../helpers/url-helper'
import { getCookie, setCookie } from '../helpers/cookie-helper'

const User = styled(({ className, index, data, onSelect }) => {
  const handleClick = (e) => {
    onSelect(index)
  }

  const avatar = getUrl(`/avatars/${data.avatar}`)
  return <div className={className} onClick={handleClick}>
    <div className='avatar' style={{ backgroundImage: `url('${avatar}')`}} />
    <span>{data.name}</span>
  </div>
})`
  margin-right: ${props => props.theme.padding(8)};
  cursor: pointer;

  &:last-of-type {
    margin-right: 0;
  }

  .avatar {
    width: 140px;
    height: 140px;
    background-size: cover;
    border: 3px solid ${props => props.theme.colors.white};
    margin-bottom: ${props => props.theme.padding(4)};
    opacity: .5;
  }

  span {
    font-size: 1.4rem;
    color: rgba(255, 255, 255, 0.5);
  }

  &:hover {
    .avatar {
      opacity: 1;
    }

    span {
      color: ${props => props.theme.colors.white};
    }
  }
`

export default styled(({ className }) => {
  const history = useHistory();
  const { loading, account, selectedUser, setSelectedUser } = React.useContext(AuthContext)

  const handleSelectUser = (i) => {
    const user = account.users[i]
    
    const expiryDate = new Date()
    expiryDate.setHours(expiryDate.getHours() + 1)
    setCookie('user', i, expiryDate.toUTCString())
    
    setSelectedUser(user)
    history.push('/browse')
  }

  React.useEffect(() => {
    if (selectedUser !== null) {
      history.push('/browse')
    }
  }, [selectedUser])
  
  if (loading || account == null) {
    return <Loading />
  }

  return <Body>
    <div className={className}>
      <div>
        <h1>Who's watching?</h1>
        <div className='users'>
          {account.users.map((user, i) => {
            return <User
              key={i}
              index={i}
              data={user}
              onSelect={handleSelectUser}
            />
          })}
        </div>
      </div>
    </div>
  </Body>
})`
  height: calc(100vh - ${props => props.theme.padding(8)});
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    text-align: center;
    
    h1 {
      font-size: 2.4rem;
      margin-bottom: ${props => props.theme.padding(8)};
    }

    .users {
      display: flex;
    }
  }
`