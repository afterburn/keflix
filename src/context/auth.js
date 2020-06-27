import React from 'react'

const AuthContext = React.createContext({})

export const Component = ({ children }) => {
  const [loading, setLoading] = React.useState(true)
  const [account, setAccount] = React.useState(null)

  return <AuthContext.Provider value={{
    loading,
    setLoading,
    account,
    setAccount
  }}>
    {children}
  </AuthContext.Provider>
}

export default AuthContext