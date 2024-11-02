import { NextResponse } from "next/server";
import { getCookie } from "cookies-next";

export async function middleware(req, res) {
    const { pathname } = req.nextUrl;

    if (pathname.startsWith('/icon') || pathname.startsWith('/_next/') || pathname.startsWith('/static/') || pathname.startsWith('/api/')) {
        return NextResponse.next();
    }

    if (req.nextUrl.pathname.startsWith("/user") || req.nextUrl.pathname == '/authorization' || req.nextUrl.pathname == '/profile-data') {
        if (!getCookie('is_logged_in', { req, res })) {
            return redirectTo('/login', req);
        }
    }


    if (getCookie('is_logged_in', { req, res })) {
        if (req.nextUrl.pathname == '/login') {
            return redirectTo('/user/dashboard', req);
        }
    }

    // Check profile complete or not
    let userStr = getCookie("user_data", { req, res });
    let user = null;
    if (userStr) {
        user = JSON.parse(userStr);
    }

    if (user) {
        if (user.profile_complete != 1) {
            if (req.nextUrl.pathname.startsWith("/user")) {
                return redirectTo('/profile-data', req);
            }
        } else {
            if (req.nextUrl.pathname == '/profile-data') {
                return redirectTo('/user/dashboard', req);
            }
        }
        if (user.ev != 1 || user.sv != 1 || user.tv != 1) {
            if (req.nextUrl.pathname.startsWith("/user")) {
                return redirectTo('/authorization', req);
            }
        } else {
            if (req.nextUrl.pathname == '/authorization') {
                return redirectTo('/user/dashboard', req);
            }
        }

        if (req.nextUrl.pathname == '/user/withdraw' || req.nextUrl.pathname == '/user/withdraw/confirmation') {
            if (user.kv != 1) {
                return redirectTo('/user/kyc-verification', req);
            }
        }
        if (req.nextUrl.pathname == '/user/kyc-verification') {
            if (user.kv == 1) {
                return redirectTo('/user/dashboard', req);
            }
        }
    }
}


function redirectTo(url, req) {
    return NextResponse.redirect(new URL(url, req.url));
}