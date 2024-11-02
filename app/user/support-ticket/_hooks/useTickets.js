import {
    useState,
    useEffect
} from 'react';
import toast from 'react-hot-toast';
import ENDPOINTS from "@/lib/endpoints";
import {
    getFormData,
    request,
    slug
} from '@/lib/helpers';
import { useRouter } from 'next/navigation';
import usePaginationParams from '@/app/_hooks/usePaginationParams';

export default function useTickets() {
    const [tickets, setTickets]               = useState([]);
    const [loading, setLoading]               = useState(false);
    const [showPagination, setShowPagination] = useState(false);
    const [ticket, setTicket]                 = useState(null);
    const [replies, setReplies]               = useState([]);
    const { pageNumber, setPageNumber }       = usePaginationParams();
    const router                              = useRouter();
    const [submitting, setSubmitting]         = useState(false);

    useEffect(() => {
        getTickets(null);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber]);

    const getTickets = async (url = null) => {
        try {
            setLoading(true);
            const {
                data
            } = await request.get(url ? url : ENDPOINTS.TICKETS + '?page=' + pageNumber || 1);
            if (data.status === 'success') {
                setTickets(data.data.tickets);
                setShowPagination(true);
            } else {
                data.message.error.forEach(message => {
                    toast.error(message);
                });
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (values, resetForm) => {
        const formData = getFormData(values);
        try {
            setSubmitting(true);
            const {
                data
            } = await request.post(ENDPOINTS.CREATE_TICKET, formData);

            if (data.status === 'success') {
                toast.success('Ticket created successfully');
                resetForm();
                router.push('/user/support-ticket/' + data.data.ticket.ticket);
            } else if (data.status === 'error') {
                data.message.error.forEach(message => {
                    toast.error(message);
                });
            }
        } catch (error) {
            console.error('Error submitting ticket:', error);
            toast.error(error.message);
        } finally {
            setSubmitting(false);
        }
    }

    const getTicket = async (ticket_number) => {
        try {
            const {
                data
            } = await request.get(ENDPOINTS.VIEW_TICKET + '/' + ticket_number);
            return data.data;
        } catch (error) {
            console.error('Error fetching ticket:', error);
            toast.error(error.message);
        }
    }

    const closeTicket = async (ticketId) => {
        try {
            setSubmitting(true);
            const { data } = await request.post(ENDPOINTS.CLOSE_TICKET + '/' + ticketId);
            data?.message?.success?.map(msg => toast.success(msg));
            return data;
        } catch (error) {
            console.error('Error closing ticket:', error);
            toast.error('An error occurred while closing your ticket');
        } finally {
            setSubmitting(false);
        }
    }

    const replyTicket = async (ticketId, values) => {
        try {
            setSubmitting(true);
            const { data } = await request.post(ENDPOINTS.REPLY_TICKET + '/' + ticketId, getFormData(values));
            data?.message?.success?.map(msg => toast.success(msg));
            return data;
        } catch (error) {
            console.error('Error closing ticket:', error);
            toast.error('An error occurred while replying your ticket');
        } finally {
            setSubmitting(false);
        }
    }

    const handlePagination = (page) => {
        setPageNumber(page);
    }

    const downloadFile = async (attachmentId) => {
        const response = await request.get(ENDPOINTS.DOWNLOAD_TICKET_ATTACHMENT + `/${attachmentId}`, {
            responseType: 'blob'
        });

        const name = `${slug(ticket?.subject)}-attachments.png`;
        const fileBlob = new Blob([response.data], { type: 'image/png' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(fileBlob);
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return {
        tickets,
        replyTicket,
        loading,
        handleSubmit,
        showPagination,
        handlePagination,
        getTicket,
        closeTicket,
        downloadFile,
        replies,
        ticket,
        setTicket,
        setReplies,
        submitting
    };
}