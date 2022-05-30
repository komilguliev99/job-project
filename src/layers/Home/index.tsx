import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

export const Home: FC<{}> = props => {
  return (
        <div className="Home">
            <h1>Job project</h1>
            <Link to="posts">Posts</Link>
        </div>
  )
}
