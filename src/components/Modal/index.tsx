import React, { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.scss'

const modalRoot = document.getElementById('modal');

interface IModal {
	children?: React.ReactNode;
	hidePost: () => void;
}

export const Modal: FC<IModal> = props => {
    const { children, hidePost } = props;

    const el = document.createElement('div');

    useEffect(() => {
        if (!modalRoot) return;
        modalRoot?.appendChild(el);
        el.addEventListener('click', (e: any) => {
            if (el === e.target) {
                hidePost()
            }
        })
        return () => {
            modalRoot.removeChild(el);
        }
    })

    return ReactDOM.createPortal(children, el);
}
