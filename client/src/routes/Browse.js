import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Loading from '../components/Loading'
import Header from '../components/Header'
import Body from '../components/Body'
import Movie from '../components/Movie'

import AuthContext from '../context/auth'
import { Switch, Route, useParams } from 'react-router-dom'
import { getJson } from '../helpers/fetch-helper'
import { getUrl } from '../helpers/url-helper'

const Movies = styled(({ className }) => {
  const [movies, setMovies] = React.useState([])

  React.useEffect(() => {
    getJson(getUrl('/api/movies?query=all'))
      .then(({ movies, pageCount }) => {
        setMovies(movies)
      })
  }, [])

  return <div className={className}>
    <div className='collection'>
      {movies.map((movie, i) => {
        return <Link to={`/watch/${movie.slug}`} key={i}>
          <Movie data={movie} />
        </Link>
      })}
    </div>
  </div>
})`
  .collection {
    display: flex;
    flex-wrap: wrap;
  }
`

const Series = () => {
  return <div>Series</div>
}

export default () => {
  const { loading, account, selectedUser } = React.useContext(AuthContext)
  
  if (loading || account == null || selectedUser == null) {
    return <Loading />
  }

  return <>
    <Header />
    <Body>
      <Switch>
        <Route path='/browse/movies' component={Movies} />
        <Route path='/browse/series' component={Series} />
      </Switch>
    </Body>
  </>
}