import { getMetaTitle } from "@/lib/helpers";
import ResetRequestForm from "./_components/ResetRequestForm";

export const metadata = getMetaTitle('Password Reset Request');

export default function PasswordResetRequest() {
    return (
        <>
            <div className="page-wrapper">
                <ResetRequestForm />
            </div>
        </>
    )
}
