import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Filter } from '../../components/Filter';
import { IPost } from '../../store/posts/index.typing';
import { Post } from '../../components/Post';
import './index.scss';
import { Pagination } from '../../components/Pagination';
import { Select } from '../../components/Select';
import { Modal } from '../../components/Modal';
import { PostDetail } from '../../components/PostDetail';

interface IPostsProps {
	posts?: IPost[]
}

interface IPostsState {
	selectedPerPageIdx: number;
	currPage: number;
	options: number[];
	posts: IPost[];
	showDetailIdx: number;
}

class Posts extends Component<IPostsProps, IPostsState> {
    constructor(props: IPostsProps) {
        super(props)
        this.state = {
            selectedPerPageIdx: 0,
            currPage: 1,
            options: [10, 20, 50],
            posts: props.posts || [],
            showDetailIdx: -1
        }

        this.setPage = this.setPage.bind(this)
        this.selectOnChange = this.selectOnChange.bind(this)
        this.onSearch = this.onSearch.bind(this)
        this.postSelected = this.postSelected.bind(this)
        this.hidePost = this.hidePost.bind(this)
    }

    postSelected (showDetailIdx: number) {
        console.log('post Selected')
        this.setState({ showDetailIdx })
    }

    getPosts () {
        const { currPage, selectedPerPageIdx, options, posts } = this.state;
        console.log('Posts: ', posts)
        const perPage = options[selectedPerPageIdx];
        const start = (currPage - 1) * perPage;
        const end = start + perPage;
        return posts.slice(start, end).map((item, idx) => {
            return (
                <div key={item.title} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                    <Post title={item.title} body={item.body} index={idx} onClick={this.postSelected} />
                </div>
            )
        })
    }

    setPage (page: number) {
        this.setState({ currPage: page });
    }

    selectOnChange (selectedPerPageIdx: number) {
        this.setState({ selectedPerPageIdx, currPage: 1 });
    }

    onSearch(text: string) {
        if (!this.props.posts) return;
        const posts = this.props.posts.filter(post => post.title.includes(text))
        this.setState({ posts });
    }

    hidePost () {
        this.setState({ showDetailIdx: -1 })
    }

    getModal() {
        const { showDetailIdx, posts } = this.state;
        if (showDetailIdx <= -1) return null;
        const post = posts[showDetailIdx];
        return (
            <Modal hidePost={this.hidePost}>
                <PostDetail title={post.title} body={post.body} />
            </Modal>
        )
    }

    render() {
        const { selectedPerPageIdx, currPage, options, posts } = this.state;
        const perPage = options[selectedPerPageIdx];
        return (
            <div className="Posts">
                <h1 className="Posts__title" >Posts</h1>
                <hr />
                <Filter onSearch={this.onSearch}>
                    <Select options={options} selected={selectedPerPageIdx} onChange={this.selectOnChange} />
                </Filter>
                <div className="row">
                    { this.getPosts() }
                </div>
                <Pagination
                    perPage={perPage}
                    currPage={currPage}
                    total={ (posts.length > 0 && posts.length) || 0}
                    setPage={this.setPage}
                />
                { this.getModal() }
            </div>
        );
    }
}

function MapStateToProps(state: any) {
    return {
        posts: state.posts.data
    }
}

export default connect(MapStateToProps, null)(Posts)
