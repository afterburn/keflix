import React from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import classNames from 'classnames'

import Toolbar from '../../Toolbar'
import Button from '../../../Button'

import { getJson, postJson } from '../../../../helpers/fetch-helper'
import { getUrl } from '../../../../helpers/url-helper'

export default styled(({ className }) => {
  const history = useHistory();
  const [crawlUrl, setCrawlUrl] = React.useState('')
  const [crawlResult, setCrawlResult] = React.useState(null)
  const [selectedVersions, setSelectedVersions] = React.useState([])

  const handleCrawl = () => {
    getJson(getUrl(`/api/crawl?url=${crawlUrl}`))
      .then(res => {
        setCrawlResult(res)
        setSelectedVersions(res.versions.map(version => false))
      })
      .catch(err => console.log(err))
  }

  const handleAddToQueue = () => {
    postJson(getUrl('/api/movies/enqueue'), { ...crawlResult, versions: crawlResult.versions.filter((version, i) => selectedVersions[i]) })
      .then(res => {
        history.push('/cp/jobs')
      })
      .catch(err => {
        console.log(err)
      })
  }

  const toggleVersion = (i) => {
    const newSelectedVersions = [...selectedVersions]
    newSelectedVersions[i] = !newSelectedVersions[i]
    setSelectedVersions(newSelectedVersions)
  }

  return <div className={className}>
    <Toolbar>
      <Toolbar.Left>
        <Link to='/cp/movies/0'>
          <Button height={34}>
            &larr; Back
          </Button>
        </Link>
        <Toolbar.Field
          type='text'
          name='url'
          placeholder='URL'
          onChange={setCrawlUrl}
        />
        <Button height={34} onClick={handleCrawl}>Crawl</Button>
      </Toolbar.Left>
      {crawlResult !== null && selectedVersions.some(version => version === true) &&
        <Toolbar.Right>
          <Button height={34} onClick={handleAddToQueue}>
            Add to queue
          </Button>
        </Toolbar.Right>
      }
    </Toolbar>
    {crawlResult !== null &&
      <div className='crawl-result'>
        <div className='cover' style={{backgroundImage: `url('${crawlResult.cover}')`}} />
        <div className='movie-info'>
          <span className='title'>{crawlResult.title}</span>
          <span className='year'>{crawlResult.year}</span>
          <span className='description'>{crawlResult.description}</span>
          <span className='genres'>{crawlResult.genres.join(' / ')}</span>
          <div className='versions'>
            {crawlResult.versions.map((version, i) => {
              return <div className='version' key={i} onClick={() => toggleVersion(i)}>
                <div className={classNames('checkbox', {
                  'checked': selectedVersions[i]
                })}>
                  <div />
                </div>
                <span>{version.type}</span>
              </div>
            })}
          </div>
        </div>
      </div>
    }
  </div>
})`
  width: calc(234px * 4);
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: ${props => props.theme.borderRadius};
  padding: ${props => props.theme.padding(2)};
  
  .crawler {
    display: flex;
    margin-top: ${props => props.theme.padding(2)};

    button {
      margin-left: ${props => props.theme.padding(2)};
    }
  }

  .crawl-result {
    display: flex;
    justify-content: space-between;
    margin-top: ${props => props.theme.padding(2)};

    .cover {
      width: 230px;
      background-size: cover;
      height: 345px;
      border: 3px solid ${props => props.theme.colors.white};
    }

    .movie-info {
      width: calc(100% - 230px - ${props => props.theme.padding(4)});
      display: flex;
      flex-direction: column;

      span {
      }

      .title {
        font-size: 1.4rem;
        font-weight: bold;
        margin-bottom: ${props => props.theme.padding(2)};
      }

      .year {
        margin-bottom: ${props => props.theme.padding(4)};
      }
      
      .description {
        margin-bottom: ${props => props.theme.padding(4)};
      }

      .genres {
        margin-bottom: ${props => props.theme.padding(4)};
      }

      .versions {
        .version {
          display: flex;
          justify-content: flex-start;
          padding: ${props => props.theme.padding(4)};
          background-color: rgba(0, 0, 0, 0.2);
          margin-bottom: ${props => props.theme.padding(2)};
          cursor: pointer;

          .checkbox {
            width: 16px;
            height: 16px;
            border-radius: ${props => props.theme.borderRadius};
            background-color: rgba(255, 255, 255, .05);
            margin-right: ${props => props.theme.padding(4)};
            display: flex;
            justify-content: center;
            align-items: center;
            
            div {
              width: 12px;
              height: 12px;
              background-color: transparent;
              border-radius: ${props => props.theme.borderRadius};
            }

            &.checked {
              div {
                background-color: ${props => props.theme.colors.primary};
              }
            }
          }
        }
      }
    }
  }
`