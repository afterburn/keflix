import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export default styled(({ className }) => {
  return <div className={className}>
    <Link to='/browse/series'>Series</Link>
    <Link to='/browse/movies'>Movies</Link>
  </div>
})`
a {
  margin-right: ${props => props.theme.padding(4)};
}
`