import React from 'react'
import styled from 'styled-components'
import classNames from 'classnames'

export default styled(({ className, icon }) => {
  return <div className={classNames(className, 'icon')}>
    <i className='material-icons'>{icon}</i>
  </div>
})`
  width: ${props => props.hasOwnProperty('size') ? props.size + 'px' : '24px'};
  height: ${props => props.hasOwnProperty('size') ? props.size + 'px' : '24px'};

  i {
    font-size: ${props => props.hasOwnProperty('size') ? props.size + 'px' : '24px'};
  }
`