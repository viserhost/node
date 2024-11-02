"use client";

import { Form, Formik } from "formik";
import Link from "next/link";
import Input from "@/app/_forms/Input";
import Captcha from "@/app/_partials/Captcha";
import SubmitBtn from "@/app/_partials/SubmitBtn";
import useLoginHandler from "../_hooks/useLoginHandler";
import { FormField, FormGroup, FormLabel } from "@/app/_forms/FormsStore";
import useUtility from "@/app/_hooks/useUtility";
import SocialLogin from "@/app/_partials/SocialLogin";
export default function LoginForm() {

    const { initialValues, validationSchema, handleSubmit } = useLoginHandler();
    const { trans, gs } = useUtility();
    const social = gs('socialite_credentials');

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
                                <h5 className="card-title mb-0">{trans('Login')}</h5>
                            </div>
                            <div className="card-body">
                                <SocialLogin socialCredentials={social} />
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ isSubmitting }) => {
                                        return (
                                            <Form>
                                                <FormField name={'username'} label={'Username or Email'} required={true} />
                                                <FormGroup>
                                                    <div className="d-flex flex-wrap justify-content-between mb-2">
                                                        <FormLabel name={'password'} label={'Password'} required={true} />
                                                        <Link href={'password-reset-request'} >{trans('Forgot your password?')}</Link>
                                                    </div>
                                                    <Input name={'password'} type="password" required={true} />
                                                </FormGroup>
                                                <Captcha />
                                                <FormGroup>
                                                    <SubmitBtn isSubmitting={isSubmitting} title={'Login'} />
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
