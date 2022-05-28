import React, { FC } from 'react';
import './Post.scss'

interface IPost {
	title: string
}

export const Filter: FC<IPost> = ({ title }) => {
    return (
        <div className="Post">
            <img src="https://bugaga.ru/uploads/posts/2017-03/1489052030_kotik-hosiko-12.jpg" alt="" className="" />
            <h4 className="Post__title">{ title }</h4>
        </div>
    )
}
