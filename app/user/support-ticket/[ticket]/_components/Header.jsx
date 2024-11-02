'use client';

import { TicketStatus } from "../../_components/TicketStatus";

export default function Header({ handleCloseTicket, loading, ticket }) {
    if (loading || !ticket) return null;

    return (
        <div className="card-header card-header-bg d-flex flex-wrap justify-content-between align-items-center">
            <div className="d-flex gap-2">
                <TicketStatus ticket={ticket} />
                <h5 className="text-white mt-0">
                    [Ticket#{ticket.ticket}] {ticket?.subject}
                </h5>
            </div>

            {
                ticket.status !== 3 ?
                    <button className="btn btn-danger close-button btn-sm" onClick={handleCloseTicket} type="button">
                        Close
                    </button> : null
            }
        </div>
    );
}