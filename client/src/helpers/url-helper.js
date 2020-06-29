export const getUrl = (path) => {
  path = (path.startsWith('/')) ? path : `/${path}`

  let url = `http://localhost:3000${path}`
/// #if IS_PROD
  url = `https://keflix.net${path}`
/// #endif
  return url
}