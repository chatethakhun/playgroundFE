const isAuthenticate = () => {
  const token = localStorage.getItem('v2Token')

  return !!token
}

export default isAuthenticate
