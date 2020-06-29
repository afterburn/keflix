export const getCookie = (key) => {
  const cookieData = document.cookie.split('; ')
  const cookieString = cookieData.find(row => row.startsWith(key))
  if (!cookieString) {
    return null
  }
  return cookieString.split('=')[1]
}

export const setCookie = (key, value, expiry) => {
  document.cookie = `${key}=${value}; expires=${expiry}`;
}

export const deleteCookie = (key) => {
  const cookieData = document.cookie.split('; ')
  const cookieString = cookieData.find(row => row.startsWith(key))
  document.cookie = document.cookie.replace(cookieString, `${key}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;`)
}