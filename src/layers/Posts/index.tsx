import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Filter } from '../../components/Filter/Filter';
import { IPost } from '../../store/posts/index.typing';
import './Posts.scss';

interface IPostsProps {
	data?: IPost[]
}

class Posts extends Component<IPostsProps, {}> {
    constructor(props: IPostsProps) {
        super(props)
    }

    getPosts () {
        if (!this.props.data) return null;
        return this.props.data.map(item => {
            return (
                <div className="col-lg-3 col-md-4 col-sm-6">
                    <Post title={item.title} />
                </div>
            )
        })
    }

    render() {
        console.log("test: ", this.props)
        return (
            <div className="Posts">
                <h1 className="Posts__title" >Posts</h1>
                <hr />
                <Filter />
                <div className="row">
                    
                </div>
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
