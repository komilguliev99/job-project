import { createSlice } from '@reduxjs/toolkit'
import { IPostsData } from './index.typing'

export const counterSlice = createSlice({
    name: 'posts',
    initialState: {
        data: [],
        tags: ['coding', 'design', 'math']
    } as IPostsData,
    reducers: {
        setPosts: (state: any, { payload }) => {
            const { data } = payload as IPostsData;
            state.data = data;
            return state;
        }
    },
})

export default counterSlice.reducer