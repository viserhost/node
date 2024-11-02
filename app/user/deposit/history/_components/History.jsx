"use client";

import useDepositHistory from '../_hooks/useDepositHistory';
import StatusBadge from './StatusBadge';
import useUtility from '@/app/_hooks/useUtility';
import Table from '@/app/_partials/_table';
import { diffForHumans, showDateTime } from '@/lib/helpers';

export default function History() {
    const { depositHistory, loading, showPagination, handlePagination } = useDepositHistory();
    const { showAmount } = useUtility();

    const columns = [
        {
            label: 'Gateway | Transaction',
            key: 'gateway_transaction',
            render: (item) => (
                <>
                    <span className="fw-bold"><span className="text-primary">{item?.gateway?.name}</span></span>
                    <br />
                    <small>{item.trx}</small>
                </>
            )
        },

        {
            label: 'Initiated',
            key: 'created_at',
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
            key: 'amount',
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
            label: 'Conversion',
            key: 'rate',
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
            label: 'Status',
            key: 'status',
            render: (item) => (
                <>
                    <StatusBadge status={item.status} methodCode={item?.gateway?.code} />
                    <small>{diffForHumans(item.updated_at)}</small>
                </>
            )
        }
    ];

    return (
        <>
            <div className="col-lg-12">
                <Table
                    loading={loading}
                    columns={columns}
                    data={depositHistory}
                    showPagination={showPagination}
                    handlePagination={handlePagination}
                    searchable={true}
                    resource="deposits"
                />
            </div>
        </>
    )
}
