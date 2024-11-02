"use client";
import DepositForm from "./DepositForm";
import PaymentGateway from "./PaymentGateway";
import useDepositCalculation from "../_hooks/useDepositCalculation";
import useUtility from "@/app/_hooks/useUtility";

export default function DepositCard({ paymentMethods, imagePath, loading = false }) {
    const {
        selectDepositMethod,
        selectMethod,
        depositLimit,
        amount, putAmount,
        processingChargeInfo,
        processingCharge,
        payable,
        afterConvert
    } = useDepositCalculation();
    const {trans} = useUtility();
    return (
        <>
            <div className="row justify-content-center gy-sm-4 gy-3">
                <div className="col-12">
                    <h5 className="payment-card-title">{trans('Deposit')}</h5>
                </div>
                <div className="col-lg-6">
                    <div className="payment-system-list is-scrollable gateway-option-list">
                        <PaymentGateway
                            paymentMethods={paymentMethods}
                            imagePath={imagePath}
                            selectMethod={selectMethod}
                            loading={loading}
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <DepositForm
                        depositLimit={depositLimit}
                        amount={amount}
                        putAmount={putAmount}
                        processingChargeInfo={processingChargeInfo}
                        processingCharge={processingCharge}
                        payable={payable}
                        selectDepositMethod={selectDepositMethod}
                        afterConvert={afterConvert}
                    />
                </div>
            </div>
        </>
    )
}
