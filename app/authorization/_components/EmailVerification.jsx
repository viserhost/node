"use client";

import { useState } from 'react';
import CodeVerification from '@/app/_partials/CodeVerification';
import { showEmailAddress } from '@/lib/helpers';
import { Form, Formik } from 'formik';
import SubmitBtn from '@/app/_partials/SubmitBtn';
import useLoginHandler from '@/app/(auth)/login/_hooks/useLoginHandler';
import useVerificationCode from '../_hooks/useVerificationCode';
import useUtility from '@/app/_hooks/useUtility';

export default function EmailVerification({ user }) {
    const [verCode, setVerCode] = useState('');
    const {logout} = useLoginHandler();
    const {tryAgain,isResending,handleSubmit,initialValues} = useVerificationCode(verCode,setVerCode,'email');
    const {trans} = useUtility();
    return (
        <>
            <div className="verification-code-wrapper">
                <div className="verification-area">
                    <h5 className="pb-3 text-center border-bottom">{trans('Verify Email Address')}</h5>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, setFieldValue }) => {

                            return (
                                <Form className="submit-form">
                                    <p className="verification-text">{trans('A 6 digit verification code sent to your email address:')} {showEmailAddress(user?.email)}</p>

                                    <CodeVerification verCode={verCode} setVerCode={setVerCode} />

                                    <div className="mb-3">
                                        <SubmitBtn isSubmitting={isSubmitting} title="Submit" />
                                    </div>

                                    <div className="mb-3">
                                        <p>
                                            {trans('If you don\'t get any code')}, {isResending ? <i className="la la-circle-notch la-spin text-primary"></i> : <a href="#" onClick={()=>tryAgain('email')}> {trans('Try again')}</a>}
                                        </p>
                                        <a href="#" onClick={logout}>{trans('Logout')}</a>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </>
    )
}
