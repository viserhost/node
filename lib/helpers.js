import { store } from "@/store";
import { deleteCookie, getCookie } from "cookies-next";
import { useSelector } from "react-redux";
import ENDPOINTS from "./endpoints";
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import axios from "axios";

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

export const getFormData = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach((item, index) => {
                formData.append(`${key}[${index}]`, item);
            });
        } else {
            formData.append(key, value);
        }
    });
    return formData;
}

export const request = axios.create({
    baseURL: process.env.baseUrl,
});

// Request Interceptor
request.interceptors.request.use(
    (config) => {
        const token = getCookie('access-token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
request.interceptors.response.use(
    (response) => {
        if (response?.data?.remark == 'unauthenticated') {
            deleteCookie('is_logged_in');
            deleteCookie('user_data');
            window.location.href = '/login';
        }
        // Check for successful responses and return the response
        return response;
    },
    (error) => {
        // Check if the error response matches the unauthenticated structure
        console.log(error);
        if (error.response && error.response.data) {
            const { remark, status, message } = error.response.data;

            // Handle unauthenticated case
            if (remark === "unauthenticated" && status === "error") {
                console.error("User is unauthenticated:", message.error);

                // Remove the is_logged_in cookie and set user_data to null
                deleteCookie('is_logged_in');
                deleteCookie('user_data');

                // Optionally, you might want to redirect the user to the login page
                window.location.href = '/login'; // or use a router to redirect
            }
        }
        return Promise.reject(error);
    }
);

export const getMetaTitle = (title) => {
    return {
        title: getTitle(title),
        openGraph: {
            title: getTitle(title),
        }
    }
}

export const getTitle = (title = null) => {
    return title ? `${process.env.siteName} - ${title}` : process.env.siteName;
}

export const getCustomCaptcha = () => {
    const state = store.getState();
    return state.captcha.customCaptcha.data;
}

export const getGoogleCaptcha = () => {
    const state = store.getState();
    return state.captcha.googleCaptcha.data;
}

export const showEmailAddress = (email) => {
    const endPosition = email.indexOf('@') - 1;
    return email.substring(0, 1) + '***' + email.substring(endPosition + 1);
}

export function showMobileNumber(number) {
    const length = number.length;
    return number.substring(0, 2) + '***' + number.substring(length - 2);
}

export const getUser = () => {
    let userStr = getCookie("user_data");
    let user = null;
    if (userStr) {
        user = JSON.parse(userStr);
    }
    return user;
}

export const getCountries = async () => {
    try {
        const response = await fetch(process.env.baseUrl + ENDPOINTS.COUNTRIES);
        if (!response.ok) {
            throw new Error('Failed to fetch countries');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching countries:', error);
        return [];
    }
}

export function showDateTime(date, format = 'YYYY-MM-DD hh:mm A') {
    if (!date) {
        return '-';
    }

    const lang = getCookie('lang') || getDefaultLang();

    dayjs.locale(lang);
    return dayjs(date).format(format);
}

function getDefaultLang() {
    return 'en';
}

export function diffForHumans(date) {
    if (!date) {
        return '-';
    }

    const lang = getCookie('lang') || getDefaultLang();

    dayjs.locale(lang);
    return dayjs(date).fromNow();
}

export function keyToTitle(text) {
    return text.replace(/[^A-Za-z0-9 ]/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
}

export function titleToKey(text) {
    return text.toLowerCase().replace(/ /g, '_');
}

export function getLastSegment(str) {
    if (!str) {
        return null;
    }
    const segments = str.split('.');
    return segments[segments.length - 1];
}

export function getLogo() {
    return process.env.baseUrl + '/assets/images/logo_icon/logo.png';
}

export const getSEO = async ({
    description = null,
    image = null,
    keywords = null,
    title = null,
    url = null
} = {}) => {
    const globalSeo = await fetch(process.env.baseUrl + ENDPOINTS.SEO, {
        next: { revalidate: 300 }
    }).then((res) => res.json());
    const seoContents = globalSeo?.data?.seo_content?.data_values;
    return {
        title: title || getTitle('Home'),
        description: description || seoContents?.description,
        keywords: keywords || seoContents?.keywords,
        openGraph: {
            title: title || getTitle('Home'),
            description: description || seoContents?.description,
            type: 'website',
            url: url || process.env.baseUrl,
            images: [
                image ? image : process.env.baseUrl + '/assets/images/seo/' + seoContents?.image
            ]
        }
    };
}


export const slug = (string) => {
    return string.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$|--+/g, '');
}