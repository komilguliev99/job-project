import React, { FC } from 'react'
import './index.scss'
import StaticImage from '../../assets/img/static_image.jpg'

interface IPost {
  title: string;
  body: string;
  index: number;
  tag?: string;
  onClick: (idx: number) => void;
}

export const Post: FC<IPost> = props => {
  const { title, body, index, tag, onClick } = props

  const classes = [
    'Post',
    (tag && `Post_${tag}`) || ''
  ].join(' ')

  return (
        <div className={classes} onClick={() => onClick(index)}>
            <div style={{ backgroundImage: `url(${StaticImage})` }} className="Post__img" />
            <h4 className="Post__title">{ title }</h4>
            <div className="Post__desc">{ body.slice(0, 80) }</div>
        </div>
  )
}
