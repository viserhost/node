"use client";

import ENDPOINTS from "@/lib/endpoints";
import { getCustomCaptcha, getGoogleCaptcha, request } from "@/lib/helpers";
import * as Yup from "yup";
import { deleteCookie, setCookie } from "cookies-next";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { fetchGoogleCaptcha } from "@/store/captchaSlice";

export default function useLoginHandler() {
    const router = useRouter();
    const dispatch = useDispatch();

    const initialValues = {
        username: '',
        password: '',
        'g-recaptcha-response': '',
        captcha_secret: ''
    };


    const validationSchema = () => {
        const customCaptcha = getCustomCaptcha();
        const googleCaptcha = getGoogleCaptcha();

        return Yup.object().shape({
            username: Yup.string()
                .required('Username is required'),
            password: Yup.string()
                .required('Password is required'),
            captcha: customCaptcha?.data?.extension ? Yup.string().required('Please complete the reCAPTCHA') : Yup.string().nullable(),
            'g-recaptcha-response': googleCaptcha?.data?.extension ? Yup.string().required('Google recaptcha is required') : Yup.string().nullable()
        });

    }


    const handleSubmit = async (values, { resetForm }) => {
        values.is_web = 1;
        const { data } = await request.post(ENDPOINTS.LOGIN, values);

        if (data.status == 'error') {
            dispatch(fetchGoogleCaptcha(data.data));
            
            data.message.error.forEach(message => {
                toast.error(message);
            });
            return false;
        }
        let accessToken = data.data.access_token;
        let userData = data.data.user;

        setCookie('access-token', accessToken);
        setCookie('is_logged_in', true);
        console.log('useLoginHandler', userData);
        setCookie('user_data', JSON.stringify(userData));
        resetForm();
        // TODO: this should be changed in a better way without reloading the page
        // router.push('/user/dashboard');
        window.location.href = '/user/dashboard';
    }


    const logout = async () => {
        await request.get(ENDPOINTS.LOGOUT);
        deleteCookie("access-token");
        deleteCookie("is_logged_in");
        deleteCookie("user_data");
        router.push('/login');
        setTimeout(() => { 
            toast.success('Logged out successfully');
         }, 1000);
    }

    return { initialValues, validationSchema, handleSubmit, logout }
}
