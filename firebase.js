import axios from "axios";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import ENDPOINTS from "./lib/endpoints";
import { getCookie } from "cookies-next";

const firebaseConfig = {
    apiKey: "AIzaSyDSGOUHtoYwZ9hlngj9f_4VdvLgLGWOVs8",
    authDomain: "nextstarter-d81f2.firebaseapp.com",
    projectId: "nextstarter-d81f2",
    storageBucket: "nextstarter-d81f2.appspot.com",
    messagingSenderId: "1067077909927",
    appId: "1:1067077909927:web:c0f4ae9bfe03ffc7774a82",
    measurementId: "G-7JGGPKDVZY"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestForToken = async () => {
    const accessToken = getCookie('access-token');
    return getToken(messaging, { vapidKey: 'BNs2wur7YD2ZqCQfeHVZIl8PX5zB73hXOIeEkP_fRSAblSCNs7dKBRlJIHHNfqQLAm1Kz7e7T0YB3AshbQk-WJE' })
        .then(async (currentToken) => {
            if (currentToken) {
                await axios.post(`${process.env.baseUrl}${ENDPOINTS.FCM_STORE_TOKEN}`, {
                    token: currentToken
                }, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
            } else {
                console.log("No registration token available. Request permission to generate one.");
            }
        })
        .catch((err) => {
            console.error("An error occurred while retrieving token.", err);
        });
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });
