import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import AuthContext from '../context/auth'
import Loading from '../components/Loading'

const User = styled(({ className, index, data, onSelect }) => {
  const handleClick = (e) => {
    onSelect(index)
  }

  return <div className={className} onClick={handleClick}>
    <div className='avatar' style={{ backgroundImage: `url('${data.avatar}')`}} />
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
  const { loading, account, setSelectedUser } = React.useContext(AuthContext)

  const handleSelectUser = (i) => {
    const user = account.users[i]
    setSelectedUser(user)
    history.push('/browse')
  }

  
  if (loading || account == null) {
    return <Loading />
  }

  return <div className={className}>
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
})`
  height: 100vh;
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