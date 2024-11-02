import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import ENDPOINTS from "@/lib/endpoints";
import { request } from '@/lib/helpers';
import usePaginationParams from '@/app/_hooks/usePaginationParams';

export default function useWithdrawHistory() {
    const [withdrawHistory, setWithdrawHistory] = useState([]);
    const [loading, setLoading]                 = useState(false);
    const [showPagination, setShowPagination]   = useState(false);
    const { pageNumber, setPageNumber }         = usePaginationParams();

    useEffect(() => {
        getWithdrawHistory(null);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber]);

    const getWithdrawHistory = async (url = null) => {
        try {
            setLoading(true);
            const {
                data
            } = await request.get(url ? url : ENDPOINTS.WITHDRAW_HISTORY + '?page=' + pageNumber || 1);

            if (data.status === 'success') {
                setWithdrawHistory(data.data.withdrawals);
                setShowPagination(true);
            } else {
                data.message.error.forEach(message => {
                    toast.error(message);
                });
            }
        } catch (error) {
            console.error('Error fetching withdraw history:', error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePagination = (page) => {
        setPageNumber(page);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setShowPagination(false);
        getWithdrawHistory(process.env.baseUrl + ENDPOINTS.WITHDRAW_HISTORY + '?search=' + e.target.search.value);
    }

    return { withdrawHistory, loading, showPagination, handlePagination, handleSearch };
}
