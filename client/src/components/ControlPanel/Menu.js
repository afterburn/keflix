import React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'

export default styled(({ className }) => {
  const location = useLocation()
  const currentPath = location.pathname
  
  const menuItems = [
    { label: 'Overview', to: '/cp', active: currentPath === '/cp' },
    { label: 'Movies', to: '/cp/movies/0', active: currentPath.startsWith('/cp/movies') },
    { label: 'Series', to: '/cp/series', active: currentPath === '/cp/series' },
    { label: 'Accounts', to: '/cp/accounts', active: currentPath === '/cp/accounts' },
    { label: 'Roles', to: '/cp/roles', active: currentPath === '/cp/roles' },
    { label: 'Jobs', to: '/cp/jobs', active: currentPath === '/cp/jobs' },
    { label: 'Translations', to: '/cp/translations', active: currentPath === '/cp/translations' },
  ].map((menuItem, i) => {
    return <Link to={menuItem.to} key={i}>
      <div className={classNames('menu-item', {
        'active': menuItem.active
      })}>{menuItem.label}</div>
    </Link>

  })

  return <div className={className}>
    {menuItems}
  </div>
})`
  width: 240px;
  background-color: rgba(0, 0, 0, 0.2);
  padding: ${props => props.theme.padding(2)};
  border-radius: ${props => props.theme.borderRadius};

  .menu-item {
    padding: ${props => props.theme.padding(2)};
    border-radius: ${props => props.theme.borderRadius};
    color: rgba(255, 255, 255, 0.5);

    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
      color: ${props => props.theme.colors.white};
    }

    &.active {
      background-color: ${props => props.theme.colors.primary};
      color: ${props => props.theme.colors.white};
    }
  }
`