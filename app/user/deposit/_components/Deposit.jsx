'use client';

import { useEffect, useState } from "react";
import DepositCard from "./DepositCard";
import usePaymentMethod from "../_hooks/usePaymentMethod";

export const Deposit = () => {
    const { getPaymentMethods } = usePaymentMethod();
    const [imagePath, setImagePath] = useState('');
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const { imagePath, paymentMethods } = await getPaymentMethods();
            setImagePath(imagePath);
            setPaymentMethods(paymentMethods);
            setLoading(false);
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <DepositCard
            loading={loading}
            paymentMethods={paymentMethods}
            imagePath={imagePath}
        />
    )
}