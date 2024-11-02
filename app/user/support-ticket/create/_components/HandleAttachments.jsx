import useUtility from "@/app/_hooks/useUtility";

export const HandleAttachments = ({ setFieldValue, attachments, setAttachments }) => {
    const { trans } = useUtility();

    const handleFileChange = (index, event) => {
        const files = event.target.files;
        const newAttachments = [...attachments];
        newAttachments[index] = files[0]; // Store the file
        setAttachments(newAttachments);
        setFieldValue(`attachments`, newAttachments); // Update Formik's value
    };

    const removeAttachment = (index) => {
        const newAttachments = attachments.filter((_, i) => i !== index);
        setAttachments(newAttachments);
        setFieldValue(`attachments`, newAttachments); // Update Formik's value
    };

    return (
        <div>
            {attachments.map((attachment, index) => (
                <div key={index} className="attachment-group">
                    <input
                        type="file"
                        name={`attachment-${index}`}
                        onChange={(event) => handleFileChange(index, event)}
                        className="form-control"
                    />
                    <button
                        type="button"
                        onClick={() => removeAttachment(index)}
                        className="btn btn-danger"
                        style={{ marginLeft: '10px' }}
                    >
                        {trans('Remove')}
                    </button>
                </div>
            ))}
        </div>
    );
};
