"use client";

import { useEffect, useState } from "react";

export default function usePaymentConfirmation() {

    const [deposit, setDeposit] = useState(null);
    const [gatewayData, setGatewayData] = useState(null);

    useEffect(() => {
        getDeposit();
    }, []);

    const getDeposit = async () => {
        let deposit = JSON.parse(atob(localStorage.getItem('deposit')));
        let gatewayData = JSON.parse(atob(localStorage.getItem('gatewayData'))  );
        setDeposit(deposit);
        setGatewayData(gatewayData);
    }

    return {deposit, gatewayData}
}
