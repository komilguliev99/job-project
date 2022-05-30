import React, { FC } from 'react'
import CloseIcon from '../../assets/img/close.png'
import './index.scss'

interface IBadge {
  label: string;
  onClick: (tag: string) => void;
}

export const Badge: FC<IBadge> = props => {
  const { label, onClick } = props

  const style = {
    backgroundImage: `url(${CloseIcon})`
  }
  return (
        <div className={`Badge Badge_${label}`}>
            <div className="d-flex">
              <div>{ label }</div>
              <div className="Badge__close" style={style} onClick={() => onClick(label)} />
            </div>
        </div>
  )
}
