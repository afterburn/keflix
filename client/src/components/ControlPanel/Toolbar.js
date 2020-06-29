import React from 'react'
import styled from 'styled-components'


const Toolbar = styled(({ className, children }) => {
  return <div className={className}>
    {
      React.Children.map(children, (Child, i) => {
        return <div className='toolbar-item'>
          {Child}
        </div>
      })
    }
  </div>
})`
  width: 100%;
  display: flex;
  justify-content: space-between;
`


Toolbar.Field = styled(({ className, type, name, placeholder, defaultValue, value, onChange }) => {
  return <input
    className={className}
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
})`
  padding: ${props => props.theme.padding(2)};
  background-color: rgba(255, 255, 255, 0.05);
  border: 0;
  border-radius: ${props => props.theme.borderRadius};
`

Toolbar.Field.defaultProps = {
  defaultValue: ''
}

Toolbar.Left = styled(({ className, children }) => {
  return <div className={className}>
    {
      React.Children.map(children, (Child, i) => {
        return <div className='toolbar-item'>
          {Child}
        </div>
      })
    }
  </div>
})`
  display: flex;
  
  .toolbar-item {
    margin-right: ${props => props.theme.padding(2)};
  }
`

Toolbar.Right = styled(({ className, children }) => {
  return <div className={className}>
    {
      React.Children.map(children, (Child, i) => {
        return <div className='toolbar-item'>
          {Child}
        </div>
      })
    }
  </div>
})`
  display: flex;
  
  .toolbar-item {
    margin-left: ${props => props.theme.padding(2)};
  }
`

export default Toolbar