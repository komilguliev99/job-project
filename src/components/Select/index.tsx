import React, { FC, RefObject, useEffect, useRef, useState } from 'react';
import './index.scss'

interface ISelect {
	options: number[];
	selected: number;
	onChange: (selected: number) => void;
}

export const Select: FC<ISelect> = props => {
    const { options, selected, onChange } = props;
    const [active, setActive] = useState(false);
    const refOptions: RefObject<HTMLDivElement> = useRef(null);

    const selectHandler = (e: any) => {
        const target  = e.target as HTMLElement;
        onChange(parseInt(target.dataset.value as string));
    }

    useEffect(() => {
        if (!refOptions.current) return;
        refOptions.current.addEventListener('click', selectHandler);
    })

    let classes = 'Select';
    if (active) {
        classes += ' Select_active'
    }

    return (
        <div className={classes} onClick={() => setActive(!active)}>
            { options[selected] }
            <div className="Select__label">Show by</div>
            <div className="Select__options" ref={refOptions}>
                {
                    options.map((option, idx) => {
                        return <div key={idx} className="Select__option" data-value={idx}>{ option }</div>
                    })
                }
            </div>
        </div>
    )
}
