import { useState } from 'react'

const useCollapse = (initialState: boolean) => {
  const [isCollapsed, setIsCollapsed] = useState(initialState || false)
  const toggleCollapse = () => setIsCollapsed(!isCollapsed)
  return { isCollapsed, toggleCollapse }
}

export default useCollapse
