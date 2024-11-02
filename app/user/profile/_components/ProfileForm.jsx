"use client";

import { Formik } from "formik";
import SubmitBtn from "@/app/_partials/SubmitBtn";
import useProfile from '../_hooks/useProfile';
import {FormField,FormGroup} from "@/app/_forms/FormsStore";
import useUtility from "@/app/_hooks/useUtility";

export default function ProfileForm() {
    const { initialValues, validationSchema, handleSubmit } = useProfile();
    const {trans} = useUtility();
    return (
        <>
            <div className="col-md-8">
                <div className="card custom--card">
                    <div className="card-header">
                        <h5 className="card-title">{trans('Profile')}</h5>
                    </div>
                    <div className="card-body">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, handleSubmit }) => (
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <FormField name="firstname" label={'First Name'} required={true} />
                                        </div>
                                        <div className="col-sm-6">
                                            <FormField name="lastname" label={'Last Name'} required={true} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <FormField name="email" label={'E-mail Address'} readOnly={true} required={true} />
                                        </div>
                                        <div className="col-sm-6">
                                            <FormField name="mobile" label={'Mobile Number'} readOnly={true} required={true} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <FormField name="address" label={'Address'} />
                                        </div>
                                        <div className="col-sm-6">
                                            <FormField name="state" label={'State'} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <FormField name="zip" label={'Zip Code'} />
                                        </div>
                                        <div className="col-sm-4">
                                            <FormField name="city" label={'City'} />
                                        </div>
                                        <div className="col-sm-4">
                                            <FormField name="country" label={'Country'} readOnly={true} />
                                        </div>
                                    </div>
                                    <FormGroup>
                                        <SubmitBtn isSubmitting={isSubmitting} title={'Submit'} />
                                    </FormGroup>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    )
}
