import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.scss';
import { Home } from './layers/Home/Home';
import Posts from './layers/Posts';
import { IPostsState, IPostsData, IPost } from './store/posts/index.typing';

interface IAppProps {
	setPosts: IPostsState['setPosts']
}

class App extends React.Component<IAppProps, {}> {
    constructor(props: IAppProps) {
        super(props);
        this.state = {
			
        }
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(res => res.json())
            .then((data: IPost[]) => {
                this.props.setPosts({ data });
            })
            .catch(err => console.log(err))
    }

    render () {
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
        );
    }
}

function MapDispatchToProps (dispatch: any) {
    return {
        setPosts: (payload: IPostsData) => dispatch({ type: 'posts/setPosts', payload })
    }
}

export default connect(null, MapDispatchToProps)(App);
