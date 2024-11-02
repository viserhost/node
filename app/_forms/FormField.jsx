import { ErrorMessage } from "formik";
import Input from "../_forms/Input";
import FormGroup from "./FormGroup";
import FormLabel from "./FormLabel";
import useUtility from "@/app/_hooks/useUtility";
import Select from "./Select";

export default function FormField({
    name,
    label,
    type = 'text',
    readOnly = false,
    required = false,
    inputGroup = false,
    inputGroupText = '',
    inputGroupTextPosition = 'left',
}) {
    const {trans} = useUtility();
    
    const formField = () => {
        if (type === 'select') {
            return <Select name={name} />
        } else if(type == 'textarea') {
            return <Input as="textarea" name={name} type={type} readOnly={readOnly} required={required} />
        }
        return <Input name={name} type={type} readOnly={readOnly} required={required} />
    }
    return (
        <>
            <FormGroup>
                <div>
                    <FormLabel name={name} label={label} required={required} />
                    {inputGroup ? (
                        <div className="input-group">
                            {inputGroupTextPosition === 'left' && <span className="input-group-text">{inputGroupText}</span>}
                            {formField()}
                            {inputGroupTextPosition === 'right' && <span className="input-group-text">{inputGroupText}</span>}
                        </div>
                    ) : (
                        formField()
                    )}
                </div>
                <ErrorMessage name={name} component="p" className="text-danger d-block" />
            </FormGroup>
        </>
    )
}
