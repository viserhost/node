import { getMetaTitle } from "@/lib/helpers";
import ChangePasswordForm from "./_components/ChangePasswordForm";

export const metadata = getMetaTitle('Change Password');

export default function ChangePassword() {

    return (
        <>
            <div className="row justify-content-center">
                <ChangePasswordForm />
            </div>
        </>
    )
}
