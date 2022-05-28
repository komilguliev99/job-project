export interface IPost {
	userId: number,
	id: number,
	title: string,
	body: string
}

export interface IPostsData {
	data: IPost[]
}

export interface IPostsState extends IPostsData {
	setPosts: (data: IPostsData) => void
}
