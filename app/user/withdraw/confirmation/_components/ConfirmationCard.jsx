"use client";
import FormBuilder from "@/app/_partials/FormBuilder";
import useWithdrawalConfirmation from "../_hooks/useWithdrawalConfirmation";
import useUtility from "@/app/_hooks/useUtility";
import SubmitBtn from "@/app/_partials/SubmitBtn";
import { Form, Formik } from "formik";
import { getUser } from "@/lib/helpers";
import FormField from "@/app/_forms/FormField";

export default function ConfirmationCard() {
    const { initialValues, handleSubmit, withdrawInfo } = useWithdrawalConfirmation();
    const {  withdraw_data, form, method } = withdrawInfo;
    const { showAmount } = useUtility();
    const user = getUser();

    return (
        <>
            <div className="col-lg-8">
                <div className="card custom--card">
                    <div className="card-header">
                        <h5 className="card-title">Withdraw Via {method?.name}</h5>
                    </div>
                    <div className="card-body">
                        <div className="alert alert-primary">
                            <p className="mb-0"><i className="las la-info-circle"></i> You are requesting <b>{showAmount(withdraw_data?.amount)}</b> for withdrawal. The admin will send you <b className="text--success">{showAmount(withdraw_data?.final_amount,false)} {withdraw_data?.currency} </b> to your account.</p>
                        </div>
                        <div className="mb-2">
                            <div dangerouslySetInnerHTML={{ __html: method?.description }} />
                        </div>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    {form && <FormBuilder form={form} />}

                                    {user?.ts == 1 && (<FormField name="authenticator_code" label={'Google Authenticator Code'} required={true} />)}
                                    
                                    <div className="form-group">
                                        <SubmitBtn isSubmitting={isSubmitting} title={'Submit'} />
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    )
}
