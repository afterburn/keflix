import React from 'react'
import styled from 'styled-components'

export default styled(({ className }) => {
  return <div className={className}>
    <span className="progress">
      <svg height="60" width="60">
        <circle cx="30" cy="30" r="20" strokeWidth="8" fill="none" />
      </svg>
    </span>
  </div>
})`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .progress {
    transform: rotate(-90deg);  
    stroke: ${props => props.theme.colors.primary};
  }

  .progress circle {
    stroke-dasharray: 130;
    stroke-dashoffset: 130;
    animation: dash 1.5s infinite;  
  }
`