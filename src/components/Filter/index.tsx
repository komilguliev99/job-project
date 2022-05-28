import React, { FC } from 'react';
import './index.scss'

interface IFilter {
	children?: React.ReactNode;
	onSearch: (text: string) => void;
}

export const Filter: FC<IFilter> = props => {
    const { children, onSearch } = props;
    return (
        <div className="Filter">
            <div className="row">
                <div className="col-lg-9 col-md-10 col-sm-12 mb-2">
                    <div className="Filter__input-group">
                        <input
                            type="search"
                            id="form1"
                            className="form-control"
                            onChange={(e: any) => onSearch(e.target.value)}
                        />
                        <button type="button" className="btn btn-primary">Search</button>
                    </div>
                </div>
                <div className="col-lg-3 col-md-2">
                    { children }
                </div>
            </div>
        </div>
    )
}
