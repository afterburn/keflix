export const getUrl = (path) => {
  path = (path.startsWith('/')) ? path : `/${path}`
/// #if IS_PROD
  return `https://keflix.net${path}`
}