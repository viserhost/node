import { useState } from 'react';
import toast from 'react-hot-toast';
import ENDPOINTS from '@/lib/endpoints';
import { useRouter } from 'next/navigation';
import { request } from '@/lib/helpers';

export default function useDeposit() {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const initialValues = {
        amount: 0,
    }

    const handleSubmit = async (values, { resetForm }, amount, selectDepositMethod) => {
        setIsSubmitting(true);
        if(!amount || amount <= 0){
            toast.error('Please enter an amount');
            setIsSubmitting(false);
            return;
        }
        if(!selectDepositMethod){
            toast.error('Please select a deposit method');
            setIsSubmitting(false);
            return;
        }

        if(amount < parseFloat(selectDepositMethod.min_amount)){
            toast.error('Amount is less than minimum limit');
            setIsSubmitting(false);
            return;
        }
        if(amount > parseFloat(selectDepositMethod.max_amount)){
            toast.error('Amount is greater than maximum limit');
            setIsSubmitting(false);
            return;
        }

        values = {
            amount: amount,
            method_code: selectDepositMethod.method_code,
            currency: selectDepositMethod.currency,
            is_web:1
        }

        const { data } = await request.post(ENDPOINTS.PAYMENT_REQUEST, values);

        if(data.status == 'error'){
            data.message.error.forEach(message => {
                toast.error(message);
            });
            setIsSubmitting(false);
            return false;
        }

        if(data.data?.gateway_data?.error){
            toast.error(data.data?.gateway_data?.message);
            setIsSubmitting(false);
            return;
        }

        if (data.data?.gateway_data?.redirect) {
            return router.push(data.data?.gateway_data?.redirect_url);
        }

        localStorage.setItem('gatewayData',btoa(JSON.stringify(data.data.gateway_data)));
        localStorage.setItem('deposit', btoa(JSON.stringify(data.data.deposit)));
        resetForm();
        setIsSubmitting(false);
        router.push('/user/deposit/confirmation');
    }
    return { initialValues, handleSubmit, isSubmitting }
}
