import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'

import Login from './routes/Login'
import Browse from './routes/Browse'
import Watch from './routes/Watch'
import Account from './routes/Account'
import ControlPanel from './routes/ControlPanel'
import Settings from './routes/Settings'

import { Component as AuthProvider } from './context/auth'

import theme from './theme'
import AuthContext from './context/auth'

import { getUrl } from './helpers/url-helper'
import { getJson } from './helpers/fetch-helper'
import { getCookie } from './helpers/cookie-helper'

const AppWrapper = styled(({ className, children }) => {
  const history = useHistory()
  const { setAccount, setLoading, setSelectedUser } = React.useContext(AuthContext)

  React.useEffect(() => {
    setLoading(true)
    
    getJson(getUrl('/api/me'))
      .then(account => {
        setAccount(account)

        const userId = getCookie('user')
        if (userId == null) {
          history.replace('/')
        } else {
          const user = account.users[Number(userId)]
          setSelectedUser(user)
        }

        setLoading(false)
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
            <Route path='/browse' component={Browse} />
            <Route path='/watch/:slug' component={Watch} />
            <Route path='/watch' component={Watch} />
            <Route path='/signin' component={Login} />
            <Route path='/cp' component={ControlPanel} />
            <Route path='/settings' component={Settings} />
          </Switch>
        </AppWrapper>
      </Router>
    </ThemeProvider>
  </AuthProvider>
, document.getElementById('root'))