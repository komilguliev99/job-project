import React, { FC } from 'react'
import StaticImage from '../../assets/img/static_image.jpg'
import './index.scss'

interface IPostDetail {
  title: string;
  body: string;
}

export const PostDetail: FC<IPostDetail> = ({ title, body }) => {
  return (
        <div className="PostDetail">
            <div className="row">
                <div className="col-lg-4 col-md-6">
                    <div style={{ backgroundImage: `url(${StaticImage})` }} className="PostDetail__img" />
                </div>
                <div className="col-lg-8 col-md-6 PostDetail__info m-sm-0">
                    <h4 className="PostDetail__title p-sm-2">{ title }</h4>
                    <div className="PostDetail__desc p-sm-2">{ body }</div>
                </div>
            </div>
        </div>
  )
}
