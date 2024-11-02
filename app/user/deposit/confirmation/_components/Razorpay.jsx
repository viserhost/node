import { useEffect, useRef } from 'react';
import useUtility from "@/app/_hooks/useUtility";

export default function Razorpay({ deposit, data }) {
    const { showAmount } = useUtility();
    const scriptRef = useRef(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = data.checkout_js;
        Object.keys(data.val).forEach(key => {
            script.setAttribute(`data-${key}`, data.val[key]);
        });
        const currentRef = scriptRef.current;
        currentRef.appendChild(script);
        return () => {
            if (currentRef) {
                currentRef.removeChild(script);
            }
        };
    }, [data]);

    return (
        <>
            <div className="card custom--card">
                <div className="card-header">
                    <h5 className="card-title">Razorpay</h5>
                </div>
                <div className="card-body p-5">
                    <ul className="list-group text-center">
                        <li className="list-group-item d-flex justify-content-between">
                            You have to pay:
                            <strong>{deposit && showAmount(deposit.final_amount, false )} {deposit && (deposit.method_currency)}</strong>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            You will get:
                            <strong>{deposit && showAmount(deposit.amount)}</strong>
                        </li>
                    </ul>
                    <form action={data.url} method={data.method}>
                        <input type="hidden" custom={data.custom} name="hidden" />
                        <div ref={scriptRef} className="push-script"></div>
                    </form>
                </div>
            </div>
        </>
    )
}
