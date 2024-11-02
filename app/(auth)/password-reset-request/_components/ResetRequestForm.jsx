"use client";

import Captcha from "@/app/_partials/Captcha";
import SubmitBtn from "@/app/_partials/SubmitBtn";
import {FormField,FormGroup} from "@/app/_forms/FormsStore";
import { Form, Formik } from "formik";
import Link from "next/link";
import usePasswordResetRequestHandler from "../_hooks/usePasswordResetRequestHandler";
import useUtility from "@/app/_hooks/useUtility";

export default function ResetRequestForm() {
    const {initialValues,validationSchema,handleSubmit} = usePasswordResetRequestHandler();
    const {trans} = useUtility();
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-7 col-xl-5">
                        <div className="text-end">
                            <Link href="/" className="fw-bold home-link"><i className="las la-long-arrow-alt-left"></i> {trans('Go to Home')}</Link>
                        </div>
                        <div className="card custom--card">
                            <div className="card-header">
                                <h5 className="card-title">{trans('Account Recovery')}</h5>
                            </div>
                            <div className="card-body">
                                <div className="mb-4">
                                    <p>{trans('To recover your account please provide your email or username to find your account.')}</p>
                                </div>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ isSubmitting }) => {
                                        return (
                                            <Form>
                                                <FormField name={'value'} label={'Email or Username'} required={true} />
                                                <Captcha />
                                                <FormGroup>
                                                    <SubmitBtn isSubmitting={isSubmitting} title={'Submit'} />
                                                </FormGroup>
                                            </Form>
                                        );
                                    }}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
