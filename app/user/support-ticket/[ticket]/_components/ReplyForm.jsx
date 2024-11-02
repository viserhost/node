'use client';
import FormField from "@/app/_forms/FormField";
import useUtility from "@/app/_hooks/useUtility";
import SubmitBtn from "@/app/_partials/SubmitBtn";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { HandleAttachments } from "../../create/_components/HandleAttachments";

export const ReplyForm = ({ attachments, setAttachments, handleReplySubmit }) => {
    const { trans } = useUtility();

    const addAttachment = () => {
        if (attachments.length < 5) {
            setAttachments([...attachments, null]);
        }
    };

    const initialValues = {
        message: '',
        attachments: [],
    };

    useEffect(() => {
        if (attachments.length > 0) {
            initialValues.attachments = attachments;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [attachments]);


    return (
        <Formik initialValues={initialValues} onSubmit={handleReplySubmit}>
            {
                ({ isSubmitting, setFieldValue }) => {
                    return (<Form>
                        <div className="row justify-content-between">
                            <div className="col-md-12">

                                <FormField label="Reply" type="textarea" name="message" rows="10" required={true} />

                            </div>

                            <div className="col-md-9">
                                <button type="button" className="btn btn-dark btn-sm my-2" onClick={addAttachment}>
                                    <i className="fas fa-plus"></i> {trans('Add Attachment')}
                                </button>
                                <p className="mb-2">
                                    <span className="text--info">
                                        {trans('Max 5 files can be uploaded | Maximum upload size is 200MB | Allowed File Extensions: .jpg, .jpeg, .png, .pdf, .doc, .docx')}
                                    </span>
                                </p>
                                <div className="row fileUploadsContainer">
                                    <HandleAttachments
                                        setFieldValue={setFieldValue}
                                        attachments={attachments}
                                        setAttachments={setAttachments}
                                    />

                                    {/* {attachments.map((_, index) => (
                                        <div key={index} className="col-lg-4 col-md-12">
                                            <FormGroup>
                                                <div className="input-group">
                                                    <input type="file" name={`attachments[${index}]`} className="form-control" accept=".jpeg,.jpg,.png,.pdf,.doc,.docx" required />
                                                    <button type="button" className="input-group-text bg--danger border--danger" onClick={() => setAttachments(attachments.filter((_, i) => i !== index))}>
                                                        <i className="fas fa-times"></i>
                                                    </button>
                                                </div>
                                            </FormGroup>
                                        </div>
                                    ))} */}
                                </div>
                            </div>
                            <div className="col-md-3">
                                <SubmitBtn title="Reply" />
                            </div>
                        </div>
                    </Form>);
                }
            }
        </Formik>
    );
}