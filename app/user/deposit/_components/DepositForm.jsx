import DepositCalculation from "./DepositCalculation";
import DepositInput from "./DepositInput";
import { Form, Formik } from "formik";
import SubmitBtn from "@/app/_partials/SubmitBtn";
import useDeposit from "../_hooks/useDeposit";

export default function DepositForm({
    depositLimit,
    amount,
    putAmount,
    processingChargeInfo,
    processingCharge,
    payable,
    selectDepositMethod,
    afterConvert
}) {
    const { initialValues, handleSubmit, isSubmitting } = useDeposit();
    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm }, amount, selectDepositMethod)}
            >
                {() => (
                    <Form>
                        <div className="payment-system-list p-3">
                            <DepositInput amount={amount} putAmount={putAmount} />
                            <hr />
                            <DepositCalculation
                                depositLimit={depositLimit}
                                processingChargeInfo={processingChargeInfo}
                                processingCharge={processingCharge}
                                payable={payable}
                                selectDepositMethod={selectDepositMethod}
                                afterConvert={afterConvert}
                            />
                            <SubmitBtn isSubmitting={isSubmitting} title={'Submit'} />
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}
