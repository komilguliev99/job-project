import React, { FC } from 'react';
import './index.scss'
import StaticImage from '../../assets/img/static_image.jpg';

interface IPost {
	title: string;
	body: string;
	index: number;
	onClick: (idx: number) => void;
}

export const Post: FC<IPost> = ({ title, body, index, onClick }) => {
    return (
        <div className="Post" onClick={() => onClick(index)}>
            <div style={{ backgroundImage: `url(${StaticImage})` }} className="Post__img" />
            <h4 className="Post__title">{ title }</h4>
            <div className="Post__desc">{ body.slice(0, 80) }</div>
        </div>
    )
}
