"use client";

import { Form, Formik } from 'formik';
import SubmitBtn from "@/app/_partials/SubmitBtn";
import usePasswordReset from '../_hooks/usePasswordReset';
import Link from 'next/link';
import {FormGroup,FormField, PasswordField} from "@/app/_forms/FormsStore";
import { useState } from 'react';
import useUtility from '@/app/_hooks/useUtility';

export default function ResetForm() {
    const [passwordVal, setPasswordVal] = useState(null);
    const { initialValues, validationSchema, handleSubmit } = usePasswordReset();
    const {trans} = useUtility();
    return (
        <>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className="col-md-8 col-lg-7 col-xl-5">
                        <div className="text-end">
                            <Link href="/" className="fw-bold home-link"><i className="las la-long-arrow-alt-left"></i> {trans('Go to Home')}</Link>
                        </div>

                        <div className="card custom--card">
                            <div className="card-header">
                                <h5 className="card-title">{trans('Account Recovery')}</h5>
                            </div>
                            <div className="card-body">

                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm }, passwordVal)}
                                >
                                    {({ isSubmitting }) => {
                                        return (
                                            <Form>
                                                <PasswordField passwordVal={passwordVal} setPasswordVal={setPasswordVal} />
                                                <FormField name={'password_confirmation'} type='password' label={'Confirm Password'} required={true} />
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
