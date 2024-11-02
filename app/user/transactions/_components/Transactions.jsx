"use client";

import Search from "./Search";
import useTransactions from "../_hooks/useTransactions";
import Table from "@/app/_partials/_table";
import { diffForHumans, showDateTime } from "@/lib/helpers";
import useUtility from "@/app/_hooks/useUtility";

export default function Transactions() {
    const { transactions, loading, showPagination, handlePagination } = useTransactions();
    const { showAmount } = useUtility();

    const columns = [
        {
            label: 'Trx',
            key: 'trx'
        },
        {
            label: 'Transacted',
            render: (item) => (
                <>
                    {showDateTime(item.created_at)} <br /> <span className="text-muted">{diffForHumans(item.created_at)}</span>
                </>
            )
        },
        {
            label: 'Amount',
            render: (item) => (
                <>
                    <span className={`fw-bold ${item.trx_type == '+' ? 'text-success' : 'text-danger'}`}>
                        {item.trx_type} {showAmount(item.amount)}
                    </span>
                </>
            )
        },

        {
            label: 'Post Balance',
            key: 'post_balance',
            format: 'amount'
        },
        {
            label: 'Details',
            key: 'details'
        }
    ];

    return (
        <>
            <div className="col-lg-12">
                <Search />
                <Table
                    columns={columns}
                    data={transactions}
                    loading={loading}
                    showPagination={showPagination}
                    handlePagination={handlePagination}
                    searchable={true}
                    resource="transactions"
                />
            </div>
        </>
    )
}
