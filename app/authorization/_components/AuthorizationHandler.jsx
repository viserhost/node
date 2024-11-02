"use client";

import { getUser } from "@/lib/helpers";
import EmailVerification from "./EmailVerification";
import MobileVerification from "./MobileVerification";
import TwoFaVerification from "./TwoFaVerification";

export default function AuthorizationHandler() {
    const user = getUser();
    return (
        <>
            {
                user.ev != 1 ?
                    <EmailVerification user={user} />
                    : user.sv != 1 ?
                        <MobileVerification />
                        : <TwoFaVerification />
            }
        </>
    )
}
