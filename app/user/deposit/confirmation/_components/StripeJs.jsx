import React, { useEffect } from 'react';
import useUtility from '@/app/_hooks/useUtility';

export default function StripeJs({ data, deposit }) {
    const { showAmount } = useUtility();

    useEffect(() => {
        const script = document.createElement('script');
        script.src = data.src;
        script.className = 'stripe-button';
        Object.keys(data.val).forEach(key => {
            script.setAttribute(`data-${key}`, data.val[key]);
        });
        document.querySelector('.push-script').appendChild(script);
        return () => {
            document.querySelector('.push-script').removeChild(script);
        };
    }, [data]);

    useEffect(() => {
        const stripeScript = document.createElement('script');
        stripeScript.src = "https://js.stripe.com/v3/";
        document.body.appendChild(stripeScript);
        return () => {
            document.body.removeChild(stripeScript);
        };
    }, []);

    return (
        <>
            <div className="card custom--card">
                <div className="card-header">
                    <h5 className="card-title">Stripe Storefront</h5>
                </div>
                <div className="card-body p-5">
                    <form action={data.url} method={data.method}>
                        <ul className="list-group text-center">
                            <li className="list-group-item d-flex justify-content-between">
                                You have to pay:
                                <strong>{showAmount(deposit.final_amount, false)} {deposit.method_currency}</strong>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                You will get:
                                <strong>{showAmount(deposit.amount)}</strong>
                            </li>
                        </ul>
                        <div className='push-script'></div>
                    </form>
                </div>
            </div>
        </>
    );
}
