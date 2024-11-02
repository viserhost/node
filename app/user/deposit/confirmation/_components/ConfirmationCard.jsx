"use client";

import { getLastSegment } from "@/lib/helpers";
import usePaymentConfirmation from "../_hooks/usePaymentConfirmation";
import Redirect from "./Redirect";
import Authorize from "./Authorize";
import Checkout from "./Checkout";
import Flutterwave from "./Flutterwave";
import NMI from "./NMI";
import Paystack from "./Paystack";
import Razorpay from "./Razorpay";
import Stripe from "./Stripe";
import StripeJs from "./StripeJs";
import StripeV3 from "./StripeV3";

export default function ConfirmationCard() {
    const { deposit, gatewayData } = usePaymentConfirmation();
    const lastSegment = getLastSegment(gatewayData?.view);

    const cards = {
        'redirect': <Redirect data={gatewayData} />,
        'Authorize': <Authorize data={gatewayData} />,
        'Checkout': <Checkout data={gatewayData} />,
        'Flutterwave': <Flutterwave data={gatewayData} deposit={deposit} />,
        'NMI': <NMI data={gatewayData} />,
        'Paystack': <Paystack data={gatewayData} deposit={deposit} />,
        'Razorpay': <Razorpay data={gatewayData} deposit={deposit} />,
        'Stripe': <Stripe data={gatewayData} deposit={deposit} />,
        'StripeJs': <StripeJs data={gatewayData} deposit={deposit} />,
        'StripeV3': <StripeV3 data={gatewayData} deposit={deposit} />,
    };

    return (
        <div>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    {deposit && gatewayData ? (
                        cards[lastSegment]
                    ) : (
                        <div>
                            <h1>Loading...</h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
