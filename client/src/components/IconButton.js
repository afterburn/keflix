import React from 'react'
import styled from 'styled-components'

import Button from './Button'
import Icon from './Icon'

export default styled(({ className, icon, size, onClick }) => {
  return <div className={className}>
    <Button width={size} height={size} centerContent variant='transparent' onClick={onClick}>
      <Icon icon={icon} size={size/2} />
    </Button>
  </div>
})`
`