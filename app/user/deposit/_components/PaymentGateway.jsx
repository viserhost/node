"use client";

import { useState, useEffect } from "react";
import useUtility from "@/app/_hooks/useUtility";
import Skeleton from "react-loading-skeleton";

export default function PaymentGateway({ paymentMethods, imagePath, selectMethod, loading = false }) {
    const { trans } = useUtility();
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        if (showAll) {
            const sixthItem = document.querySelectorAll('.payment-item')[5];
            if (sixthItem) {
                sixthItem.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [showAll]);

    if (loading) return (
        <div className="px-3">
            <Skeleton
                direction="ltr"
                duration={0.6}
                height={40}
                count={5}
            />
        </div>
    );

    return (
        <>
            {paymentMethods.map((method, index) => (
                <label key={method.id} htmlFor={method.id}
                    className={`payment-item ${(!showAll && index > 4) ? 'd-none' : ''}`}>
                    <div className="payment-item__info">
                        <span className="payment-item__check"></span>
                        <span className="payment-item__name">{trans(method.name)}</span>
                    </div>
                    <div className="payment-item__thumb">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            className="payment-item__thumb-img"
                            src={`${process.env.baseUrl}/${imagePath}/${method.method.image}`}
                            alt="payment-thumb"
                        />
                    </div>
                    <input className="payment-item__radio gateway-input" hidden id={method.id}
                        type="radio" name="method_code" value={method.id}
                        onChange={() => selectMethod(method)}
                    />
                </label>
            ))}

            {(paymentMethods.length > 4 && !showAll) && (
                <button type="button" className={`payment-item__btn more-gateway-option`} onClick={() => {
                    setShowAll(true);
                }}>
                    <p className="payment-item__btn-text">{trans('Show All Payment Options')}</p>
                    <span className="payment-item__btn__icon"><i className="las la-chevron-down"></i></span>
                </button>
            )}
        </>
    )
}
