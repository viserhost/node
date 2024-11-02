"use client";

import Search from './Search.jsx';
import useWithdrawHistory from '../_hooks/useWithdrawHistory';
import StatusBadge from './StatusBadge.jsx';
import { showDateTime, diffForHumans } from '@/lib/helpers';
import Table from '@/app/_partials/_table/index.js';
import useUtility from '@/app/_hooks/useUtility.js';

export default function History() {
    const { withdrawHistory, loading, showPagination, handlePagination, handleSearch } = useWithdrawHistory();
    const { showAmount } = useUtility();

    const columns = [
        {
            label: 'Gateway | Transaction',
            render: (item) => (
                <>
                    <span className="fw-bold"><span className="text-primary">{item?.method?.name}</span></span>
                    <br />
                    <small>{item.trx}</small>
                </>
            )
        },

        {
            label: 'Initiated',
            render: (item) => (
                <>
                    {showDateTime(item.created_at)}
                    <br />
                    <span className="text-muted">
                        {diffForHumans(item.created_at)}
                    </span>
                </>
            )
        },

        {
            label: 'Amount',
            render: (item) => (
                <>
                    {showAmount(1)} = {showAmount(item.rate, false)} {item.currency}
                    <br />
                    <strong>
                        {showAmount(item.final_amount, false)} {item.currency}
                    </strong>
                </>
            )
        },

        {
            label: 'Conversion',
            key: 'rate',
            render: (item) => (
                <>
                    {showAmount(item.amount)} - <span className="text--danger">{showAmount(item.charge)}</span>
                    <br />
                    <strong>
                        {showAmount(item.amount - item.charge)}
                    </strong>
                </>
            )
        },

        {
            label: 'Status',
            key: 'status',
            render: (item) => (
                <>
                    <StatusBadge status={item.status} updatedAt={item.updated_at} />
                    <small>{diffForHumans(item.updated_at)}</small>
                </>
            )
        }
    ];

    return (
        <>
            <div className="col-lg-12">
                <Search handleSearch={handleSearch} />
                <Table
                    columns={columns}
                    data={withdrawHistory}
                    loading={loading}
                    showPagination={showPagination}
                    handlePagination={handlePagination}
                    searchable={true}
                    resource="withdrawals"
                />
            </div>
        </>
    )
}
