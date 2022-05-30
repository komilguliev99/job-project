import React, { FC, RefObject, useEffect, useRef, useState } from 'react'
import './index.scss'

interface ISelect {
  options: number[] | string[];
  selected: Record<number, boolean>;
  label: string;
  multiSelect?: boolean;
  onChange: (selected: number) => void;
}

export const Select: FC<ISelect> = props => {
  const { options, selected, label, multiSelect, onChange } = props
  const [active, setActive] = useState(false)
  const refOptions: RefObject<HTMLDivElement> = useRef(null)

  const selectHandler = (e: any) => {
    const target = e.target as HTMLElement
    if (!target.dataset.value) return
    onChange(parseInt(target.dataset.value as string))
    if (multiSelect) {
      e.stopPropagation()
    }
  }

  const docHandler = (e: any) => {
    setActive(false)
  }

  useEffect(() => {
    document.addEventListener('click', docHandler)
    if (!refOptions.current) return
    refOptions.current.addEventListener('click', selectHandler)
    return () => {
      document.removeEventListener('click', docHandler)
      if (!refOptions.current) return
      refOptions.current.removeEventListener('click', selectHandler)
    }
  })

  const classes = [
    'Select',
    (multiSelect && 'Select_multi') || '',
    (active && 'Select_active') || ''
  ].join(' ')

  const optionList = () => {
    return options.map((option, idx) => {
      return (
        <div
          key={idx}
          className={'Select__option' + (selected[idx] ? ' selected' : '')}
          data-value={idx}>{ option }</div>
      )
    })
  }

  let selectedIdx: number = -1
  if (!multiSelect) {
    selectedIdx = options.findIndex((val, idx) => selected[idx])
  }

  const onClickActive = (e: any) => {
    setActive(!active)
    e.stopPropagation()
  }

  return (
        <div className={classes}>
            { label && !multiSelect && <div className="Select__label">{ label }</div> }
            <div className="Select__value" onClick={onClickActive}>
                { multiSelect ? label : options[selectedIdx] }
                <div className="Select__options" ref={refOptions}>
                    { optionList() }
                </div>
            </div>
        </div>
  )
}
