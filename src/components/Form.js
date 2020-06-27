import React from 'react'
import styled from 'styled-components'

const FormContext = React.createContext({})

export const Form = styled(({ className, children, onSubmit}) => {
  const [data, setData] = React.useState(() => {
    const result = {}
    children.forEach(child => {
      if (!!child.props.name) {
        result[child.props.name] = child.props.defaultValue || ''
      }
    })
    return result
  })

  const setField = (key, value) => {
    const newData = {...data}
    newData[key] = value
    setData(newData)
  }
  const getField = (key) => data[key]

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(data)
  }

  return <FormContext.Provider value={{
    setField,
    getField
  }}>
    <form className={className} onSubmit={handleSubmit}>
      {children}
    </form>
  </FormContext.Provider>
})`

`

export const Field = styled(({ className, type, name, placeholder }) => {
  const { setField, getField } = React.useContext(FormContext)
  const [value, setValue] = React.useState(getField(name))

  const handleChange = e => {
    setValue(e.target.value)
    setField(e.target.name, e.target.value)
  }

  return <div className={className}>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
    />
  </div>
})`
  input {
    padding: ${props => props.theme.padding(2)};
  }
  margin-bottom: ${props => props.theme.padding(2)};
`
