import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import ENDPOINTS from "@/lib/endpoints";
import { request } from '@/lib/helpers';
import usePaginationParams from '@/app/_hooks/usePaginationParams';

export default function useDepositHistory() {
    const [depositHistory, setDepositHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showPagination, setShowPagination] = useState(false);
    const { pageNumber, setPageNumber } = usePaginationParams();

    const getDepositHistory = useCallback(async (url = null) => {
        try {
            setLoading(true);
            const {
                data
            } = await request.get(url ? url : ENDPOINTS.DEPOSIT_HISTORY + '?page=' + pageNumber || 1);

            if (data.status === 'success') {
                setDepositHistory(data.data.deposits);
                setShowPagination(true);
            } else {
                data.message.error.forEach(message => {
                    toast.error(message);
                });
            }
        } catch (error) {
            console.error('Error fetching deposit history:', error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }, [pageNumber]);

    useEffect(() => {
        getDepositHistory(null);
    }, [pageNumber, getDepositHistory]);


    const handlePagination = (page) => {
        setPageNumber(page);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setShowPagination(false);
        getDepositHistory(process.env.baseUrl + ENDPOINTS.DEPOSIT_HISTORY + '?search=' + e.target.search.value);
    }

    return { depositHistory, loading, showPagination, handlePagination, handleSearch };
}
