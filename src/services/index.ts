const api = process.env.REACT_APP_API

export const getRecommends = () => {
  return fetch(`${api}/api/v1/recommends`)
}
