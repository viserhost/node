"use client";

import { Form, Formik } from "formik";
import useKYC from "../_hooks/useKYC";
import FormBuilder from "@/app/_partials/FormBuilder";
import SubmitBtn from "@/app/_partials/SubmitBtn";

export default function KYCForm() {
    const { kycForm, initialValues, handleSubmit } = useKYC();
    return (
        <>
            <div className="col-lg-8">
                <div className="card custom--card">
                    <div className="card-header">
                        <h5 className="card-title">KYC Form</h5>
                    </div>
                    <div className="card-body">

                        <Formik
                            initialValues={initialValues}
                            // validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, setFieldValue }) => (
                                <Form>
                                    {kycForm ?
                                        <div>
                                            <FormBuilder form={kycForm} setFieldValue={setFieldValue} />
                                            <div className="form-group">
                                                <SubmitBtn isSubmitting={isSubmitting} title={'Submit'} />
                                            </div>
                                        </div> :
                                        'Loading...'
                                    }
                                </Form>
                            )}
                        </Formik>

                    </div>
                </div>
            </div>
        </>
    )
}
