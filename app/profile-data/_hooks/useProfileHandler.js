"use client";

import { useState, useEffect } from 'react';
import { object, string } from 'yup';
import { useRouter } from 'next/navigation';
import { getCountries, request } from '@/lib/helpers';
import toast from 'react-hot-toast';
import { setCookie } from 'cookies-next';
import ENDPOINTS from '@/lib/endpoints';
import { setUserData } from "@/store/userSlice";
import { useDispatch } from 'react-redux';

const useProfileHandler = () => {
    const dispatch = useDispatch();
    const [countries, setCountries] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchCountries = async () => {
            const countriesData = await getCountries();
            setCountries(countriesData.data.countries);
        };
        fetchCountries();
    }, []);

    const initialValues = {
        username: '',
        country: '',
        mobile: '',
        mobile_code: '',
        country_code: '',
        address: '',
        state: '',
        zip: '',
        city: '',
    };

    const validationSchema = object().shape({
        username: string().required('Username is required'),
        country: string().required('Country is required'),
        mobile: string().required('Mobile number is required')
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const { data } = await request.post(ENDPOINTS.UPDATE_USER_DATA, values);
            if (data.status === 'error') {
                data.message.error.forEach(message => {
                    toast.error(message);
                });
                return false;
            }

            const updatedUserData = data.data.user;
            dispatch(setUserData(updatedUserData));
            setCookie('user_data', updatedUserData);

            toast.success('Profile updated successfully');
            resetForm();
            router.push('/user/dashboard');
        } finally {
            setSubmitting(false);
        }
    };

    return {
        initialValues,
        validationSchema,
        handleSubmit,
        countries,
    };
};

export default useProfileHandler;
