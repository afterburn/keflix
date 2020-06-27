import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import Button from '../components/Button'
import { Form, Field } from '../components/Form'

import { getUrl } from '../helpers/url-helper'
import { postJson } from '../helpers/fetch-helper'

import AuthContext from '../context/auth'

export default styled(({ className }) => {
  const history = useHistory()
  const { account, setAccount } = React.useContext(AuthContext)

  const handleSignIn = (data) => {
    postJson(getUrl('/api/login'), data)
      .then(account => {
        setAccount(account)
        history.replace('/')
      })
      .catch(err => {
        console.log(err)
      })
  }

  React.useState(() => {
    if (account != null) {
      history.replace('/')
    }
  }, [account])

  return <div className={className}>
    <Form onSubmit={handleSignIn} width={300}>
      <Field
        type='email'
        name='email'
        placeholder='E-mail'
      />
      <Field
        type='password'
        name='password'
        placeholder='Password'
      />
      <Button>Sign in</Button>
    </Form>
  </div>
})`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
`