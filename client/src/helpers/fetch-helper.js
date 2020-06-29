export const getJson = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(res => {
        if (res.errors) {
          return reject(res.errors)
        }
        resolve(res.payload)
      })
      .catch((err) => {
        console.log(err)
        reject([{
          code: 0,
          message: 'Internal server error.'
        }])
      })
  })
}

export const postJson = (url, data) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(res => {
        if (res.errors) {
          return reject(res.errors)
        }
        resolve(res.payload)
      })
      .catch((err) => {
        console.log(err)
        reject([{
          code: 0,
          message: 'Internal server error.'
        }])
      })
  })
}