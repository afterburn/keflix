import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'

import Login from './routes/Login'
import Dashboard from './routes/Dashboard'
import Account from './routes/Account'

import { Component as AuthProvider } from './context/auth'

import theme from './theme'
import AuthContext from './context/auth'

import { getUrl } from './helpers/url-helper'
import { getJson } from './helpers/fetch-helper'

const AppWrapper = styled(({ className, children }) => {
  const history = useHistory()
  const { setAccount, setLoading } = React.useContext(AuthContext)

  React.useEffect(() => {
    getJson(getUrl('/api/me'))
      .then(account => {
        setAccount(account)
        setLoading(false)
        history.push('/browse')
      })
      .catch(err => {
        setLoading(false)
        history.replace('/signin')
      })
  }, [])

  return <div className={className}>
    {children}
  </div>
})`
`

ReactDOM.render(
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <Router>
        <AppWrapper>
          <Switch>
            <Route exact path='/' component={Account} />
            <Route path='/browse' component={Dashboard} />
            <Route path='/signin' component={Login} />
          </Switch>
        </AppWrapper>
      </Router>
    </ThemeProvider>
  </AuthProvider>
, document.getElementById('root'))