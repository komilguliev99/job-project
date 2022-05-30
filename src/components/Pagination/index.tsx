import React, { FC, useEffect } from 'react'
import './index.scss'

interface IPagination {
  perPage: number;
  currPage: number;
  total: number;
  setPage: (page: number) => void;
}

export const Pagination: FC<IPagination> = props => {
  const { perPage, total, currPage, setPage } = props
  const totalPages = Math.ceil(total / perPage)

  const clickHandler = (e: any) => {
    const target = e.target as HTMLDivElement
    if (!target.classList.contains('Pagination__btn')) return
    const step = parseInt(target.dataset.step as string)
    if (step > 0) {
      setPage(step)
    } else {
      setPage(currPage + step + 1)
    }
  }

  useEffect(() => {
    document.addEventListener('click', clickHandler)
    return () => {
      document.removeEventListener('click', clickHandler)
    }
  }, [currPage])

  return (
        <div className="Pagination">
            { currPage > 1 && <div className="Pagination__btn" data-step={-2}>&lt; prev</div> }
            { Array.from(Array(totalPages).keys()).map(num => {
              const classes = [
                'Pagination__btn',
                ((num + 1) === currPage && 'Pagination__btn_active') || ''
              ].join(' ')
              return <div key={num} className={classes} data-step={num + 1}>{ num + 1 }</div>
            })}
            { currPage < totalPages && <div className="Pagination__btn" data-step={0}>next &gt;</div>}
        </div>
  )
}
