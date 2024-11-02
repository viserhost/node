'use client';

import Link from "next/link";
import useTickets from "../_hooks/useTickets"
import Table from "@/app/_partials/_table";
import { TicketStatus } from "./TicketStatus";
import { TicketPriority } from "./TicketPriority";
import useUtility from "@/app/_hooks/useUtility";

export const Tickets = () => {
    const { tickets, loading, showPagination, handlePagination } = useTickets();
    const { trans } = useUtility();

    const columns = [
        {
            label: 'Ticket ID',
            key: 'ticket',
        },
        {
            label: 'Subject',
            key: 'subject',
        },
        {
            label: 'Status',
            render: (ticket) => <TicketStatus ticket={ticket} />
        },
        {
            label: 'Priority',
            render: (ticket) => <TicketPriority ticket={ticket} />
        },
        {
            label: 'Last Reply',
            key: 'last_reply',
            format: 'date',
        },
        {
            label: 'Action',
            key: 'action',
            render: (ticket) => <Link href={`/user/support-ticket/${ticket.ticket}`} className="btn btn-sm btn-primary">{trans('View')}</Link>
        }
    ];
    return (
        <>
            <div className="d-flex justify-content-end mb-3">
                <Link className="btn btn-primary" href="/user/support-ticket/create">Create</Link>
            </div>
            <Table
                columns={columns}
                loading={loading}
                showPagination={showPagination}
                handlePagination={handlePagination}
                data={tickets}
            />
        </>
    )
}

