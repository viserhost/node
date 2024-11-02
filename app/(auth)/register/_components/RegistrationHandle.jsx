"use client";

import useUtility from "@/app/_hooks/useUtility";
import RegistrationForm from "./RegistrationForm";
import RegistrationDisabled from "./RegistrationDisabled";

export default function RegistrationHandle() {
    const {gs} = useUtility();
    const isRegisterEnabled = gs('registration');

    return (
        <>
            {isRegisterEnabled ? <RegistrationForm /> : <RegistrationDisabled />}
        </>
    )
}
