import React from 'react'
import styled from 'styled-components'

export default styled(({ className, image }) => {
  return <div className={className}>
    {image}
  </div>
})`
  svg {
    height: 100%;
    width: 100%;
  }
`