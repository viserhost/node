import ENDPOINTS from "@/lib/endpoints";
import { getUser, request } from "@/lib/helpers"
import { setCookie } from "cookies-next";
import toast from "react-hot-toast";
import * as Yup from 'yup';

export default function useProfile() {
    const user = getUser();
    const initialValues = {
        firstname: user.firstname,
        lastname : user.lastname,
        email    : user.email,
        mobile   : user.mobile,
        address  : user.address,
        city     : user.city,
        state    : user.state,
        zip      : user.zip,
        country  : user.country_name,
    }

    const validationSchema = Yup.object().shape({
        firstname: Yup.string().required(),
        lastname : Yup.string().required(),
        email    : Yup.string().email().required(),
        mobile   : Yup.string().required(),
        country  : Yup.string().required(),
    });

    const handleSubmit = async (values) => {
        try {
            const { email, mobile, country, ...updatedValues } = values;
            const { data } = await request.post(ENDPOINTS.UPDATE_PROFILE, updatedValues);

            if (data.status === 'success') {
                toast.success(data.message.success);
                const updatedUserData = { ...getUser(), ...updatedValues };
                setCookie('user_data', JSON.stringify(updatedUserData));
            } else if (data.status === 'error') {
                data.message.error.forEach(message => {
                    toast.error(message);
                });
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('An error occurred while updating your profile');
        } 
    };

    return { initialValues, validationSchema, handleSubmit }
}
