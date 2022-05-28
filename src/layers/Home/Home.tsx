import React, { FC } from 'react';
import { Link } from 'react-router-dom';

export const Home: FC<{}> = props => {
    return (
        <div>
            <Link to="posts">go to posts</Link>
        </div>
    )
}
