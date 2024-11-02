'use client';

import { Form, Formik } from "formik";
import { useState } from 'react';
import SubmitBtn from "@/app/_partials/SubmitBtn";
import useUtility from "@/app/_hooks/useUtility";
import useChangePassword from '../_hooks/useChangePassword';
import {FormField,FormGroup, PasswordField} from "@/app/_forms/FormsStore";

export default function ChangePasswordForm() {
    const [passwordVal, setPasswordVal] = useState(null);
    const { initialValues, validationSchema, handleSubmit } = useChangePassword();
    const {trans} = useUtility();

    return (
        <>
            <div className="col-md-8">
                <div className="card custom--card">
                    <div className="card-header">
                        <h5 className="card-title">{trans('Change Password')}</h5>
                    </div>
                    <div className="card-body">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm }, setPasswordVal)}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <FormField name="current_password" type="password" label="Current Password" required />
                                    <PasswordField passwordVal={passwordVal} setPasswordVal={setPasswordVal} />
                                    <FormField name="password_confirmation" type="password" label="Confirm Password" required />
                                    <FormGroup>
                                        <SubmitBtn isSubmitting={isSubmitting} title={'Submit'} />
                                    </FormGroup>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    )
}
