import React from 'react'
import styled from 'styled-components'
import { useParams, Link, Redirect } from 'react-router-dom'
import { getUrl } from '../helpers/url-helper'
import { getJson } from '../helpers/fetch-helper'

import Loading from '../components/Loading'
import IconButton from '../components/IconButton'
import Slider from '../components/Slider'

export default styled(({ className }) => {
  const { slug } = useParams()
  const [isLoading, setIsLoading] = React.useState(true)
  const [movie, setMovie] = React.useState(null)
  const [isPlaying, setIsPlaying] = React.useState(true)
  const [isFullScreen, setIsFullScreen] = React.useState(false)
  const [volume, setVolume] = React.useState(0.5)
  const videoRef = React.useRef()
  
  const handleSetVolume = (value) => {
    videoRef.current.volume = value
    setVolume(value)
  }

  const handlePlay = () => {
    videoRef.current.play()
    setIsPlaying(true)
  }

  const handlePause = () => {
    videoRef.current.pause()
    setIsPlaying(false)
  }

  const handleFullScreenOn = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
      document.documentElement.msRequestFullscreen();
    }
    setIsFullScreen(true)
  }

  const handleFullScreenOff = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }
    setIsFullScreen(false)
  }

  React.useEffect(() => {
    getJson(getUrl(`/api/stream-info/${slug}`))
      .then(movie => {
        setMovie(movie)
        setIsLoading(false)
      })
      .catch(err => {
        console.log(res)
      })
  }, [])

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume
    }
  }, [videoRef.current, volume])
  
  if (!slug || slug === '') {
    return <Redirect to='/browse/movies' />
  }

  if (isLoading) {
    return <Loading />
  }

  return <div className={className}>
    <video autoPlay ref={videoRef}>
      <source src={getUrl(`/api/stream/${movie.hash}`)} type='video/mp4' />
    </video>
    <div className='info'>
      <Link to='/browse/movies'>
        <IconButton
          icon='chevron_left'
          size={120}
          color='transparent'
        />
      </Link>
    </div>
    <div className='controls'>
      {!isPlaying &&
        <IconButton
          icon='play_arrow'
          size={120}
          color='transparent'
          onClick={handlePlay}
        />
      }
      {isPlaying &&
        <IconButton
          icon='pause'
          size={120}
          color='transparent'
          onClick={handlePause}
        />
      }
      {!isFullScreen &&
        <IconButton
          icon='fullscreen'
          size={120}
          color='transparent'
          onClick={handleFullScreenOn}
        />
      }
      {isFullScreen &&
        <IconButton
          icon='fullscreen_exit'
          size={120}
          color='transparent'
          onClick={handleFullScreenOff}
        />
      }
      <Slider
        vertical
        value={volume}
        onChange={handleSetVolume}
      />
    </div>
  </div>
})`
  width: 100%;
  height: 100vh;
  background-color: black;
  user-select: none;

  video {
    width: 100%;
    height: 100%;
  }

  .info {
    position: absolute;
    top: 0;
    left: 0;
    padding: ${props => props.theme.padding(8)};
  }

  .controls {
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: ${props => props.theme.padding(8)};
  }

`