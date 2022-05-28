import React, { FC } from 'react';
import { Link } from 'react-router-dom';

export const Home: FC<{}> = props => {
    return (
        <div>
            <h1>Job project</h1>
            <Link to="posts">Posts</Link>
        </div>
    )
}
