import React from 'react'
import styled from 'styled-components'

import { getUrl } from '../helpers/url-helper'

export default styled(({ className, data }) => {
  const cover = getUrl(`/covers/${data.slug}.jpg`)
  return <div className={className}>
    <div className='cover' style={{ backgroundImage: `url('${cover}')` }} />
    <span className='title'>{data.title}</span>
    <span className='year'>{data.year}</span>
  </div>
})`
  padding: ${props => props.theme.padding(2)};
  border-radius: ${props => props.theme.borderRadius};
  width: 230px;
  cursor: pointer;

  display: flex;
  flex-direction: column;

  .cover {
    width: 100%;
    height: 325px;
    background-size: cover;
    margin-bottom: ${props => props.theme.padding(2)};
    border: 3px solid ${props => props.theme.colors.white};
    border-radius: ${props => props.theme.borderRadius};
    opacity: 1;
  }

  .title,
  .year {
    margin-left: 3px;
  }

  .title {
    margin-bottom: ${props => props.theme.padding(1)};
  }

  .year {
    font-size: .8rem;
    color: rgba(255, 255, 255, 0.5);
  }

  &:hover {
    background-color: rgba(0, 0, 0, .2);

    .cover {
      opacity: 0.6;
    }
  }
`