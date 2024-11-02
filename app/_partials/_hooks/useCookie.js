import ENDPOINTS from '@/lib/endpoints';
import { request } from '@/lib/helpers';
import { useEffect, useState } from 'react'

export default function useCookie() {
    const [cookie, setCookie] = useState(null);
    const [cookieAccepted, setCookieAccepted] = useState(false);

    useEffect(() => {
        const cookie = document.cookie.split('; ').find(row => row.startsWith('gdpr_cookie='));
        if (cookie) {
            setCookieAccepted(true);
        }
        if(!cookieAccepted){
            getCookie();
        }
    }, []);

    const getCookie = async () => {
        const {data} = await request.get(ENDPOINTS.COOKIE);
        setCookie(data.data.cookie);
    }

    const handleCookieAccept = () => {
        const expires = new Date(Date.now() + 43200 * 1000).toUTCString();
        document.cookie = `gdpr_cookie=${window.location.hostname}; expires=${expires}; path=/`;
        setCookieAccepted(true);
    }

    return { cookie, setCookie, cookieAccepted, setCookieAccepted, handleCookieAccept }
}
