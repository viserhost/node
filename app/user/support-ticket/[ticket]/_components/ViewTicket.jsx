'use client';

import { useParams } from "next/navigation";
import Header from "./Header";
import { ReplyForm } from "./ReplyForm";
import { ReplyList } from "./ReplyList";
import { useEffect, useState } from "react";
import useTickets from "../../_hooks/useTickets";

export const ViewTicket = () => {
    const { ticket: ticketNo } = useParams();
    const {
        getTicket,
        loading,
        replyTicket,
        closeTicket,
        downloadFile,
        replies,
        ticket,
        setTicket,
        setReplies
    } = useTickets();
    const [attachments, setAttachments] = useState([]);

    useEffect(() => {
        getTicket(ticketNo).then(ticket => {
            setReplies(ticket?.messages);
            setTicket(ticket?.my_ticket);
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ticketNo]);

    const handleCloseTicket = () => {
        const isConfirmed = window.confirm("Are you sure you want to close this ticket?");

        if (isConfirmed) {
            closeTicket(ticket?.id).then((data) => {
                setTicket({ ...ticket, status: 3 });
            });
        }
    };

    const handleReplySubmit = (values, {  resetForm }) => {
        replyTicket(ticket?.id, values).then((data) => {
            const message = data?.data?.message;
            if (!message?.attachments) {
                message.attachments = [];
            }
            setTicket({ ...ticket, status: 2 });
            setReplies([message, ...replies]);
            resetForm();
            setAttachments([]);
        });
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card custom--card">
                        <Header handleCloseTicket={handleCloseTicket} loading={loading} ticket={ticket} />

                        <div className="card-body">
                            <ReplyForm 
                                attachments={attachments}
                                setAttachments={setAttachments}
                                handleReplySubmit={handleReplySubmit} 
                            />
                        </div>
                    </div>

                    <div className="card mt-4">
                        <div className="card-body">
                            <ReplyList loading={loading} replies={replies} downloadFile={downloadFile} />
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}
