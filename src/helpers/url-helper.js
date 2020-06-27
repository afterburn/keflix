export const getUrl = (path) => {
  path = (path.startsWith('/')) ? path : `/${path}`
  return `http://localhost:3000${path}`
}