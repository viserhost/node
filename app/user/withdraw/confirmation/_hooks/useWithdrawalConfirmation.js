"use client";
import { setCookie } from "cookies-next";
import { useState, useEffect } from "react";
import ENDPOINTS from "@/lib/endpoints";
import { getUser, request } from "@/lib/helpers";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function useWithdrawalConfirmation() {
    const [withdrawInfo, setWithdrawInfo] = useState({});
    const user = getUser();
    const router = useRouter();

    useEffect(() => {
        getWithdrawInfo();
    }, []);

    const getWithdrawInfo = () => {
        const withdrawData = {
            trx: localStorage.getItem('withdraw_trx'),
            withdraw_data: JSON.parse(localStorage.getItem('withdraw_data')),
            form: JSON.parse(localStorage.getItem('form')),
            method: JSON.parse(localStorage.getItem('method')),
        }
        setWithdrawInfo(withdrawData);
    }

    let tempForm = {};
    if (withdrawInfo.form) {
        Object.entries(withdrawInfo.form).forEach(([key, field]) => {
            tempForm[field.label] = '';
        });
        if (user?.ts) {
            tempForm['authenticator_code'] = '';
        }
    }

    const initialValues = tempForm

    const handleSubmit = async (values) => {
        values.trx = withdrawInfo.trx;

        const { data } = await request.post(ENDPOINTS.WITHDRAW_CONFIRM, values);

        if (data.status == 'error') {
            data.message.error.forEach(message => {
                toast.error(message);
            });
            setIsSubmitting(false);
            return false;
        }

        user.balance -= withdrawInfo.withdraw_data.amount;
        setCookie('user_data', user);

        router.push('/user/withdraw/history');



    }

    return { initialValues, getWithdrawInfo, handleSubmit, withdrawInfo };
}
