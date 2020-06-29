import React from 'react'
import styled from 'styled-components'
import prettyBytes from 'pretty-bytes'

export default styled(({ className }) => {
  const [isConnected, setIsConnected] = React.useState(false)
  const [jobs, setJobs] = React.useState([])

  const getWebSocketUrl = () => {
    let result = 'wss://localhost:3001'
/// #if IS_PROD
    result = 'wss://keflix.net:3001'
/// #endif
    return result
  }

  React.useEffect(() => {
    const wsUrl = getWebSocketUrl()
    const ws = new WebSocket(wsUrl)
    ws.onopen = () => {
      setIsConnected(true)
    }

    ws.onmessage = ({ data }) => {
      const { type, payload } = JSON.parse(data)
      switch(type) {
        case 'UPDATE_JOBS':
          setJobs(payload)
          break
      }
    }

    return () => {
      ws.close()
    }
  }, [])

  if(!isConnected) {
    return <div className={className}>
      Loading
    </div>
  }

  const mappedJobs = jobs.map((job, i) => {
    return <div className='job' key={i}>
      <div className='job-info'>
        <span>{job.name}</span>
        <span>{prettyBytes(job.downloadSpeed)}/s</span>
      </div>
      <div className='progress-container'>
        <div className='progress' style={{transform: `scale(${job.downloaded/job.total}, 1)`}}/>
      </div>
    </div>
  })
  
  return <div className={className}>
    {mappedJobs.length > 0 && mappedJobs}
    {mappedJobs.length === 0 && <>No jobs running</>}
  </div>
})`

width: calc(234px * 4);
background-color: rgba(0, 0, 0, 0.2);
border-radius: ${props => props.theme.borderRadius};
padding: ${props => props.theme.padding(2)};

.job {
  margin-bottom: ${props => props.theme.padding(4)};

  &:last-of-type {
    margin-bottom: 0;
  }

  .job-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: ${props => props.theme.padding(2)};
  }

  .progress-container {
    width: 100%;
    height: 30px;
    background-color: rgba(255, 255, 255, .05);
    border-radius: ${props => props.theme.borderRadius};
    overflow: hidden;

    .progress {
      transform-origin: center left;
      transform: scale(0.5, 1);
      width: 100%;
      height: 100%;
      background-color: ${props => props.theme.colors.primary};
      transition: transform .2s ease-out;
    }
  }
}
`
