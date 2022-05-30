import { configureStore } from '@reduxjs/toolkit'
import postsReducers from './posts'

export default configureStore({
  reducer: {
    posts: postsReducers
  }
})
