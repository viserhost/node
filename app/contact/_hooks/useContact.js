import ENDPOINTS from "@/lib/endpoints";
import { getCustomCaptcha, getFormData, getGoogleCaptcha, getUser, request } from "@/lib/helpers";
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";

export default function useContact() {
    const user = getUser();
    const router = useRouter();

    const initialValues = {
        name: user ? user?.firstname + ' ' + user?.lastname : '',
        email: user ? user?.email : '',
        subject: '',
        message: '',
        'g-recaptcha-response': '',
        captcha_secret: ''
    }

    const validationSchema = () => {
        const customCaptcha = getCustomCaptcha();
        const googleCaptcha = getGoogleCaptcha();

        return Yup.object().shape({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            subject: Yup.string().required('Subject is required'),
            message: Yup.string().required('Message is required'),
            captcha: customCaptcha?.data?.extension ? Yup.string().required('Please complete the reCAPTCHA') : Yup.string().nullable(),
            'g-recaptcha-response': googleCaptcha?.data?.extension ? Yup.string().required('Google recaptcha is required') : Yup.string().nullable()
        });
    }

    const handleSubmit = async (values, { resetForm }) => {
        values.priority = 2;
        if(user){
            authorizedTicket(values, resetForm);
        } else {
            unauthorizedTicket(values, resetForm);
        }
    }

    const authorizedTicket = async (values, resetForm) => {
        const formData = getFormData(values);
        try {
            const { data } = await request.post(ENDPOINTS.CREATE_TICKET, formData);

            if (data.status === 'success') {
                toast.success(data.message.success);
                resetForm();
                router.push('/user/support-ticket/' + data.data.ticket.ticket);
            } else if (data.status === 'error') {
                data.message.error.forEach(message => {
                    toast.error(message);
                });
            }
        } catch (error) {
            console.error('Error submitting ticket:', error);
            toast.error(error.message);
        }
    }

    const unauthorizedTicket = async (values, resetForm) => {
        const formData = getFormData(values);
        try {
            const { data } = await request.post(ENDPOINTS.CONTACT_US, formData);

            if (data.status === 'success') {
                toast.success('Ticket created successfully');
                resetForm();
                router.push('/ticket/' + data.data.ticket.ticket);
            } else if (data.status === 'error') {
                data.message.error.forEach(message => {
                    toast.error(message);
                });
            }
        } catch (error) {
            console.error('Error submitting ticket:', error);
            toast.error(error.message);
        }
    }

    return {
        initialValues,
        validationSchema,
        handleSubmit,
        user
    }
}
