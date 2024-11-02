import useUtility from '@/app/_hooks/useUtility'
import React from 'react'

export default function Search() {
    const { trans } = useUtility();
    return (
        <>
            <div className="card mb-4">
                <div className="card-body">
                    <form>
                        <div className="d-flex flex-wrap gap-4">
                            <div className="flex-grow-1">
                                <label className="form-label">{trans('Transaction Number')}</label>
                                <input type="search" name="search" className="form-control form--control" />
                            </div>
                            <div className="flex-grow-1 select2-parent">
                                <label className="form-label d-block">{trans('Type')}</label>
                                <select name="trx_type" className="form-select form--control select2-basic">
                                    <option>{trans('All')}</option>
                                    <option value="+">{trans('Plus')}</option>
                                    <option value="-">{trans('Minus')}</option>
                                </select>
                            </div>
                            <div className="flex-grow-1 select2-parent">
                                <label className="form-label d-block">{trans('Remark')}</label>
                                <select className="form-select form--control select2-basic" name="remark">
                                    <option>{trans('All')}</option>
                                </select>
                            </div>
                            <div className="flex-grow-1 align-self-end">
                                <button className="btn btn-primary w-100"><i className="las la-filter"></i> {trans('Filter')}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
