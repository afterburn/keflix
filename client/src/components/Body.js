import React from 'react'
import styled, { css } from 'styled-components'

export default styled(({ className, children }) => {
  return <div className={className}>
    {children}
  </div>
})`
  padding: ${props => props.theme.padding(4)};
  ${props => props.spaceBetween && css`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  `}
`