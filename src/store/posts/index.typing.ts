export interface IPost {
  userId: number,
  id: number,
  title: string,
  body: string,
  tag: string
}

export interface IPostsData {
  data: IPost[],
  tags?: string[]
}

export interface IPostsState extends IPostsData {
  setPosts: (data: IPostsData) => void
}
