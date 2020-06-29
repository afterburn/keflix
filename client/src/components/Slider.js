import React from 'react'
import styled, { css } from 'styled-components'

let startPosX = 0, startValue = 0

export default styled(({ className, onChange}) => {
  const sliderRef = React.useRef()
  const progressRef = React.useRef()
  const handleRef = React.useRef()

  const [value, setValue] = React.useState(0.5)
  const [isDragging, setIsDragging] = React.useState(false)

  const handleMouseDown = e => {
    startPosX = e.clientX
    startValue = value
    setIsDragging(true)
  }
  const handleMouseUp = e => {
    if (isDragging) {
      setIsDragging(false)
    }
  }
  const handleMouseMove = e => {
    if (isDragging) {
      const curPosX = e.clientX
      const deltaX = curPosX - startPosX
      const change = deltaX / 200
      let newValue = startValue + change
      if (newValue > 1) newValue = 1
      if (newValue < 0) newValue = 0
      handleRef.current.style.transform = `translate3d(${200 * newValue - 10}px, 0, 0)`
      progressRef.current.style.transform = `scale3d(${newValue}, 1, 1)`
      setValue(newValue)
      onChange(value)
    }
  }

  React.useEffect(() => {
    const slider = sliderRef.current

    slider.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      slider.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [value, sliderRef, isDragging])

  return <div className={className} ref={sliderRef}>
    <div className='progress' style={{'transform': `scale3d(${value}, 1, 1)`}} ref={progressRef} />
    <div className='handle' style={{'transform': `translate3d(${200 * value - 10}px, 0, 0)`}} ref={handleRef} />
  </div>
})`
  width: 200px;
  height: 10px;
  background: white;
  position: relative;
  border-radius: 5px;

  .progress {
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.colors.primary};
    transform-origin: center left;
    will-change: transform;
    border-radius: 5px;
  }

  .handle {
    width: 21px;
    height: 21px;
    background-color: ${props => props.theme.colors.primary};
    cursor: grab;
    position: absolute;
    top: -5px;
    left: 0;
    transform-origin: center left;
    will-change: transform;
    border-radius: 50%;
  }

`