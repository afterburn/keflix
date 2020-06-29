import React from 'react'
import classNames from 'classnames'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'

import Icon from './Icon'

import AuthContext from '../context/auth'

import { getJson } from '../helpers/fetch-helper'
import { getUrl } from '../helpers/url-helper'
import { deleteCookie } from '../helpers/cookie-helper'

export default styled(({ className }) => {
  const history = useHistory()
  const [dropdownVisible, setDropdownVisible] = React.useState(false)
  const { selectedUser, setAccount, setSelectedUser } = React.useContext(AuthContext)

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible)
  }

  const handleChangeUser = () => {
    setSelectedUser(null)
    deleteCookie('user')
    history.replace('/')
  }

  const handleLogout = () => {
    setAccount(null)
    setSelectedUser(null)
    deleteCookie('token')
    deleteCookie('user')
    history.replace('/signin')
  }

  const avatar = getUrl(`/avatars/${selectedUser.avatar}`)
  return <>
    <div className={className}>
      <div className='profile' onClick={toggleDropdown}>
        <div className='avatar' style={{ backgroundImage: `url('${avatar}')` }} />
      </div>
      <div className={classNames('dropdown', {
        'visible': dropdownVisible
      })}>
        <Link to='/settings'>
          <div className='dropdown-item'>
            <Icon icon='settings' />
            <span>Settings</span>
          </div>
        </Link>
        <div className='dropdown-item' onClick={handleChangeUser}>
          <Icon icon='account_circle' />
          <span>Change account</span>
        </div>
        <div className='dropdown-item' onClick={handleLogout}>
          <Icon icon='exit_to_app' />
          <span>Sign out</span>
        </div>
      </div>
    </div>
  </>
})`
  position: relative;
  margin-left: auto;

  .profile {
    .avatar {
      width: 37px;
      height: 37px;
      background-size: cover;
      border: 3px solid ${props => props.theme.colors.white};
    }
  }

  .dropdown {
    z-index: 1;
    position: absolute;
    width: 240px;
    background-color: #000;
    right: 0;
    padding: ${props => props.theme.padding(4, 0)};
    border-radius: ${props => props.theme.borderRadius};
    visibility: hidden;
    transform-origin: top right;
    transform: scale(0.8);
    opacity: 0;
    transition: transform ${props => props.theme.animation.speed} ${props => props.theme.animation.easeOut},
      opacity ${props => props.theme.animation.speed} ${props => props.theme.animation.easeOut},
      visibility 0s linear ${props => props.theme.animation.speed};

    &.visible {
      visibility: visible;
      transform: scale(1);
      opacity: 1;
      transition: transform ${props => props.theme.animation.speed} ${props => props.theme.animation.easeIn},
        opacity ${props => props.theme.animation.speed} ${props => props.theme.animation.easeIn},
        visibility 0s linear;
    }

    .dropdown-item {
      padding: ${props => props.theme.padding(2)};
      display: flex;
      justify-content: flex-start;
      align-items: center;
      cursor: pointer;

      span,
      .icon i {
        color: rgba(255, 255, 255, .75);
      }

      .icon {
        margin-right: ${props => props.theme.padding(2)};
      }

      &:hover {
        background-color: rgba(255, 255, 255, .05);

        span,
        .icon i {
          color: ${props => props.theme.colors.white};
        }  
      }
    }
  }
`