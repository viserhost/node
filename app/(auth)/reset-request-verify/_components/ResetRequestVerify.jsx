"use client";
import SubmitBtn from "@/app/_partials/SubmitBtn";
import CodeVerification from "@/app/_partials/CodeVerification";
import useUtility from "@/app/_hooks/useUtility";
import { Form, Formik } from "formik";
import Link from "next/link";
import useResetVerification from "../_hooks/useResetVerification";
import { FormGroup } from "@/app/_forms/FormsStore";
import { useState } from "react";


export default function ResetRequestVerify() {
    const { initialValues, handleSubmit, email } = useResetVerification();
    const [verCode, setVerCode] = useState('');
    const {trans} = useUtility();

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-7 col-xl-5">
                        <div className="text-end">
                            <Link href="/" className="fw-bold home-link"><i className="las la-long-arrow-alt-left"></i> {trans('Go to Home')}</Link>
                        </div>

                        <div className="d-flex justify-content-center">
                            <div className="verification-code-wrapper">
                                <div className="verification-area">
                                    <h5 className="pb-3 text-center border-bottom">{trans('Verify Email Address')}</h5>
                                    <p className="verification-text">{trans('A 6 digit verification code sent to your email address :')} <span className="fw-bold">{email}</span></p>
                                    <Formik
                                        initialValues={initialValues}
                                        onSubmit={(values,{resetForm}) => handleSubmit(values,{resetForm},verCode)}
                                    >
                                        {
                                            ({ isSubmitting }) => {
                                                return (
                                                    <Form>
                                                        <CodeVerification verCode={verCode} setVerCode={setVerCode} />
                                                        <FormGroup>
                                                            <SubmitBtn isSubmitting={isSubmitting} title='Submit' />
                                                        </FormGroup>
                                                    </Form>
                                                )
                                            }
                                        }
                                    </Formik>
                                    <FormGroup>
                                        {trans('Please check including your Junk/Spam Folder. if not found, you can')}
                                        <Link href={'/password-reset-request'}>{trans('Try to send again')}</Link>
                                    </FormGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
