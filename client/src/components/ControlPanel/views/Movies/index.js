import React from 'react'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import classNames from 'classnames'

import { Form, Field as Field } from '../../../Form'
import Toolbar from '../../Toolbar'
import Button from '../../../Button'
import Icon from '../../../Icon'

import Movie from '../../../Movie'
import Crawler from './Crawler'

import { getJson } from '../../../../helpers/fetch-helper'
import { getUrl } from '../../../../helpers/url-helper'

export default styled(({ className }) => {
  const params = useParams()
  const [loading, setLoading] = React.useState(true)
  const [movies, setMovies] = React.useState([])
  const [pageCount, setPageCount] = React.useState(-1)
  const [query, setQuery] = React.useState('')

  const handleSearch = val => {
    setQuery(val)
  }

  const fetchMovies = (_query, page, amount) => {
    const searchQuery = _query === '' ? 'all' : _query
    
    setLoading(true)
    getJson(getUrl(`/api/movies?query=${searchQuery}&page=${page}&amount=${amount}`))
      .then(res => {
        setPageCount(Number(res.pageCount))
        setMovies(res.movies)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }

  React.useEffect(() => {
    fetchMovies(query, Number(params.page), 8)
  }, [query, params.page])

  if (params.page === 'add') {
    return <div className={className}>
      <Toolbar>
        <Link to='/cp/movies/0'>
          <Button height={34}>
            &larr; Back
          </Button>
        </Link>
      </Toolbar>
      <Form onSubmit={()=>{}} width={300}>
        <Field
          type='email'
          name='email'
          placeholder='E-mail'
        />
      </Form>
    </div>
  }

  if (params.page === 'add-yts') {
    return <Crawler />
  }

  const pageId = Number(params.page)
  return <div className={className}>
    <Toolbar>
      <Toolbar.Left>
      <Toolbar.Field 
        type='text'
        placeholder='Search movie'
        value={query}
        onChange={handleSearch}
      />
      <Link to='/cp/movies/add'>
        <Button height={34}>
          Add
        </Button>
      </Link>
      <Link to='/cp/movies/add-yts'>
        <Button height={34}>
          Add from YTS
        </Button>
      </Link>
      </Toolbar.Left>
    </Toolbar>
    <div className='movies'>
      {loading && <div>Loading</div>}
      {!loading && movies.map((movie, i) => {
        return <Movie data={movie} key={i} />
      })}
    </div>
    {pageCount !== -1 &&
      <div className='pagination'>
        <div className='left'>
          {pageId > 0 &&
            <Link to={`/cp/movies/${pageId - 1}`}>
              <div className='page'>
                <Icon icon='chevron_left' />
              </div>
            </Link>
          }
          {pageId == 0 &&
            <div className='page hidden' />
          }
        </div>
        <div className='pages'>
          {Array.from(Array(pageCount)).map((_, i) => {
            return <Link to={`/cp/movies/${i}`} key={i}>
              <div className={classNames('page', {
                'active': pageId === i
              })}>
                {i+1}
              </div>
            </Link>
          })}
        </div>
        <div className='right'>
          {pageId < pageCount - 1 &&
            <Link to={`/cp/movies/${pageId + 1}`}>
              <div className='page'>
                <Icon icon='chevron_right' />
              </div>
            </Link>
          }
          {pageId == pageCount - 1 &&
            <div className='page hidden' />
          }
        </div>
      </div>
    }
  </div>
})`
  width: calc(234px * 4);
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: ${props => props.theme.borderRadius};
  padding: ${props => props.theme.padding(2)};

  .movies {
    display: flex;
    flex-wrap: wrap;
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: ${props => props.theme.padding(8)};

    .pages,
    .left,
    .right {
      display: flex;
    }

    .page {
      width: 36px;
      height: 36px;
      background-color: rgba(255, 255, 255, 0.05);
      border-radius: ${props => props.theme.borderRadius};
      margin-right: ${props => props.theme.padding(1)};
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: rgba(255, 255, 255, 0.5);

      i {
        color: rgba(255, 255, 255, 0.5);
      }

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        color: ${props => props.theme.colors.white};

        i {
          color: ${props => props.theme.colors.white};
        }
      }

      &.hidden {
        visibility: hidden;
      }

      &.active {
        background-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.white};
        
        i {
          color: ${props => props.theme.colors.white};
        }
      }
    }
  }
`