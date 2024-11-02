import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import ENDPOINTS from "@/lib/endpoints";
import { request } from '@/lib/helpers';
import usePaginationParams from '@/app/_hooks/usePaginationParams';

export default function useTransactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showPagination, setShowPagination] = useState(false);
    const { pageNumber, setPageNumber } = usePaginationParams();


    const getTransactions = useCallback(async (url = null) => {
        try {
            setLoading(true);
            const {
                data
            } = await request.get(url ? url : ENDPOINTS.TRANSACTIONS + '?page=' + pageNumber || 1);

            if (data.status === 'success') {
                setTransactions(data.data.transactions);
                setShowPagination(true);
            } else {
                data.message.error.forEach(message => {
                    toast.error(message);
                });
            }
        } catch (error) {
            console.error('Error fetching transaction history:', error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }, [pageNumber]);

    useEffect(() => {
        getTransactions(null);
    }, [pageNumber, getTransactions]);

    const handlePagination = (page) => {
        setPageNumber(page);
    }

    return { transactions, loading, showPagination, handlePagination };
}

