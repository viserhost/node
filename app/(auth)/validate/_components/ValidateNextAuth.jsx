"use client";

import PreLoader from "@/app/_partials/PreLoader";
import ENDPOINTS from "@/lib/endpoints";
import { request } from "@/lib/helpers";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const ValidateLogin = () => {
    const router = useRouter();
    const [session, setSession] = useState(false);

    const loginUser = useCallback(async (session) => {
        const { data } = await request.post(ENDPOINTS.SOCIAL_LOGIN, {
            provider: session.provider,
            token: session.accessToken
        });

        const userData = data?.data?.user;
        setCookie('access-token', data?.data.access_token);
        setCookie('is_logged_in', true);
        setCookie('user_data', userData);
        router.push('/user/dashboard');
    }, [router]);

    useEffect(() => {
        const fetch = async () => {
            if (!session) {
                const response = await axios.get("/api/token");  // don't use request for this
                if (response.data.session) {
                    const data = response.data.session;
                    setSession(data);
                    loginUser(data);
                }
            }
        };
        fetch();
    }, [session, loginUser]);

    return <p>You will be redirected shortly...</p>;

    return <PreLoader />;
}

export default ValidateLogin;