"use client";
import { Form, Formik } from "formik";
import Captcha from "../../_partials/Captcha";
import SubmitBtn from "../../_partials/SubmitBtn";
import useUtility from "@/app/_hooks/useUtility";
import { FormField, FormGroup } from "@/app/_forms/FormsStore";
import useContact from "../_hooks/useContact";


export default function ContactForm() {
    const { initialValues, validationSchema, handleSubmit, user } = useContact();
    const { trans } = useUtility();

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <FormField name={'name'} label={trans('Name')} required={true} readOnly={user ? true : false} />
                    <FormField name={'email'} label={trans('Email')} required={true} type="email" readOnly={user ? true : false} />
                    <FormField name={'subject'} label={trans('Subject')} required={true} type="text" />
                    <FormField name={'message'} type="textarea" label={trans('Message')} required={true} />
                    <FormGroup>
                        <Captcha />
                    </FormGroup>
                    <FormGroup>
                        <SubmitBtn isSubmitting={isSubmitting} title={trans('Submit')} />
                    </FormGroup>
                </Form>
            )}
        </Formik>
    )
}
