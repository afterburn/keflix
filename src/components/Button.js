import React from 'react'
import styled from 'styled-components'

export default styled(({ className, children }) => {
  return <button className={className}>
    {children}
  </button>
})`
  background-color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.padding(2)};
  border: 0;
  border-radius: ${props => props.theme.borderRadius};
  cursor: pointer;
  color: ${props => props.theme.colors.white};

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`