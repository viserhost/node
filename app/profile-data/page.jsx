import { getMetaTitle } from "@/lib/helpers";
import ProfileForm from "./_components/ProfileForm";

export const metadata = getMetaTitle('Profile Data');

export default function ProfileData() {
    return (
        <>
            <div className="page-wrapper">
                <div className="container">
                    <div className="row justify-content-center">
                        <ProfileForm />
                    </div>
                </div>
            </div>
        </>
    )
}
