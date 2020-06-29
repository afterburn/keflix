import React from 'react'
import styled, { css } from 'styled-components'

export default styled(({ className, children, onClick }) => {
  const handleClick = e => {
    if (onClick) {
      e.preventDefault()
      onClick()
    }
  }
  
  return <button className={className} onClick={handleClick}>
    {children}
  </button>
})`
  background-color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.padding(3, 4)};
  border: 0;
  border-radius: ${props => props.theme.borderRadius};
  cursor: pointer;
  color: ${props => props.theme.colors.white};

  ${props => props.height && css`
    height: ${props.height}px;
    padding: ${props => props.theme.padding(0, 4)};
    display: flex;
    align-items: center;
  `}

  ${props => props.width && css`
    width: ${props.width}px;
    padding: ${props => props.theme.padding(0, 4)};
    display: flex;
    align-items: center;
  `}

  ${props => props.centerContent && css`
    display: flex;
    justify-content: center;
    align-items: center;
  `}

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }

  ${props => props.variant && props.variant === 'transparent' && css`
    background-color: transparent;
    opacity: 0.5;
    outline: 0;

    &:hover {
      background-color: transparent;
      opacity: 1;
    }
  `}
`