"use client";

import { Form, Formik } from "formik";
import SubmitBtn from "@/app/_partials/SubmitBtn";
import useProfileHandler from "../_hooks/useProfileHandler";
import { useState } from "react";
import useUtility from "@/app/_hooks/useUtility";
import { FormField, Select, FormLabel, FormGroup } from "@/app/_forms/FormsStore";
import Link from "next/link";

export default function ProfileForm() {
    const { initialValues, validationSchema, handleSubmit, countries } = useProfileHandler();
    const [mobileCode, setMobileCode] = useState(93);
    const { trans } = useUtility();

    return (
        <div className="col-md-8 col-lg-7 col-xl-6">
            <div className="text-end">
                <Link href="/" className="fw-bold home-link"><i className="las la-long-arrow-alt-left"></i> {trans('Go to Home')}</Link>
            </div>

            <div className="card custom--card">
                <div className="card-header">
                    <h5 className="card-title">{trans('Profile Complete')}</h5>
                </div>
                <div className="card-body">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, setFieldValue }) => (
                            <Form>
                                <div className="row">
                                    <div className="col-md-12">
                                        <FormField name="username" required={true} label='Username' />
                                    </div>
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <FormLabel name="country" label={trans('Country')} required={true} />
                                            <Select
                                                name="country"
                                                className="form-control form--control select2"
                                                required
                                                onChange={(e) => {
                                                    const selectedCountry = countries[e.target.options.selectedIndex];
                                                    setFieldValue('country', selectedCountry.country);
                                                    setFieldValue('mobile_code', selectedCountry.dial_code);
                                                    setFieldValue('country_code', selectedCountry.country_code);
                                                    setMobileCode(selectedCountry.dial_code);
                                                }}
                                            >
                                                {countries.map((country, key) => (
                                                    <option
                                                        key={key}
                                                        data-mobile_code={country.dial_code}
                                                        value={country.country}
                                                        data-code={key}
                                                    >
                                                        {country.country}
                                                    </option>
                                                ))}
                                            </Select>
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-6">
                                        <FormField name="mobile" label='Mobile' required={true} inputGroup={true} inputGroupText={mobileCode} inputGroupTextPosition="left" />
                                    </div>
                                    <div className="col-md-6">
                                        <FormField name="address" label={trans('Address')} />
                                    </div>
                                    <div className="col-md-6">
                                        <FormField name="state" label={trans('State')} />
                                    </div>
                                    <div className="col-md-6">
                                        <FormField name="zip" label={trans('Zip Code')} />
                                    </div>
                                    <div className="col-md-6">
                                        <FormField name="city" label={trans('City')} />
                                    </div>
                                </div>
                                <FormGroup>
                                    <SubmitBtn isSubmitting={isSubmitting} title="Submit" />
                                </FormGroup>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}
