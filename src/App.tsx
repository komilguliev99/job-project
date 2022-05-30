import React, { FC, useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.scss'
import { Home } from './layers/Home'
import Posts from './layers/Posts'
import { IPostsState, IPostsData, IPost } from './store/posts/index.typing'

interface IAppProps {
  setPosts: IPostsState['setPosts']
}

const App: FC<IAppProps> = props => {
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then((data: IPost[]) => {
        props.setPosts({ data })
      })
      .catch(err => console.log(err))
  })

  return (
        <Router>
            <div className="App">
                <div className="container">
                    <Routes>
                        <Route path="/posts" element={<Posts />} />
                        <Route path="/" element={<Home />} />
                    </Routes>
                </div>
            </div>
        </Router>
  )
}

function MapDispatchToProps (dispatch: any) {
  return {
    setPosts: (payload: IPostsData) => dispatch({ type: 'posts/setPosts', payload })
  }
}

export default connect(null, MapDispatchToProps)(App)
