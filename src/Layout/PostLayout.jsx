import React from 'react'
import { Outlet } from 'react-router-dom'

function PostLayout() {
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default PostLayout