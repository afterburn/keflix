import React from 'react'

const AuthContext = React.createContext({})

export const Component = ({ children }) => {
  const [loading, setLoading] = React.useState(true)
  const [account, setAccount] = React.useState(null)
  const [selectedUser, setSelectedUser] = React.useState(null)

  return <AuthContext.Provider value={{
    loading,
    setLoading,
    account,
    setAccount,
    selectedUser,
    setSelectedUser
  }}>
    {children}
  </AuthContext.Provider>
}

export default AuthContext