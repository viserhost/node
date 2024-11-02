"use client";

import { Formik } from "formik";
import Link from "next/link";
import Captcha from "@/app/_partials/Captcha";
import SubmitBtn from "@/app/_partials/SubmitBtn";
import AgreePolicy from "./AgreePolicy";
import useRegister from '../_hooks/useRegister';
import SocialLogin from '@/app/_partials/SocialLogin';
import { useState } from "react";
import useReferral from "@/app/_hooks/useReferral";
import {FormField,FormGroup, PasswordField} from "@/app/_forms/FormsStore";
import useUtility from "@/app/_hooks/useUtility";
export default function RegistrationForm() {
    const {trans,gs} = useUtility();
    const {storedReference} = useReferral();
    const { initialValues, validationSchema, handleSubmit } = useRegister();

    const agreeEnabled = gs('agree');

    const [passwordVal,setPasswordVal] = useState(null);


    const socialCredentials = gs('socialite_credentials');


    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-7 col-xl-6">
                        <div className="text-end">
                            <Link href="/" className="fw-bold home-link"><i className="las la-long-arrow-alt-left"></i> {trans('Go to Home')}</Link>
                        </div>

                        <div className="card custom--card">
                            <div className="card-header">
                                <h5 className="card-title">{trans('Register')}</h5>
                            </div>
                            <div className="card-body">
                                <SocialLogin socialCredentials={socialCredentials} />
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm }, setPasswordVal)}
                                >
                                    {({ isSubmitting, handleSubmit }) => (
                                        <form onSubmit={handleSubmit}>
                                            {
                                                storedReference ?
                                                <FormField name={'referBy'} label={'Reference by'} type='text' value={storedReference} readOnly={true} />
                                                : ''
                                            }
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <FormField name={'firstname'} label={'First Name'} required={true} />
                                                </div>
                                                <div className="col-sm-6">
                                                    <FormField name={'lastname'} label={'Last Name'} required={true} />
                                                </div>
                                                <div className="col-md-12">
                                                    <FormField type="email" name={'email'} label={'Email'} required={true} />
                                                </div>
                                                <div className="col-md-6">
                                                    <PasswordField passwordVal={passwordVal} setPasswordVal={setPasswordVal} />
                                                </div>
                                                <div className="col-md-6">
                                                    <FormField type="password" name={'password_confirmation'} label={'Confirm Password'} required={true} />
                                                </div>
                                                <div className="col-md-12">
                                                    <Captcha />
                                                    {agreeEnabled == 1 ? <AgreePolicy /> : ''}
                                                    <FormGroup>
                                                        <SubmitBtn isSubmitting={isSubmitting} title={'Register'} />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                        </form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
