import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import Overview from './views/Overview'
import Movies from './views/Movies'
import Series from './views/Series'
import Accounts from './views/Accounts'
import Roles from './views/Roles'
import Jobs from './views/Jobs'
import Translations from './views/Translations'

export default styled(({ className }) => {
  const params = useParams()

  const getView = (view) => {
    switch (view) {
      case 'movies':
        return <Movies />
      case 'series':
        return <Series />
      case 'accounts':
        return <Accounts />
      case 'roles':
        return <Roles />
      case 'jobs':
        return <Jobs />
      case 'translations':
        return <Translations />
      default:
        return <Overview />
    }
  }

  return <div className={className}>
    {getView(params.view)}
  </div>
})`
width: calc(100% - 240px - ${props => props.theme.padding(4)});
`