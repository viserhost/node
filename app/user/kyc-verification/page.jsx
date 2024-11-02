import { getMetaTitle } from "@/lib/helpers";
import KYCForm from "./_components/KYCForm";

export const metadata = getMetaTitle('KYC Verification');

export default function KYCVerification() {
    return (
        <>
            <div className="row justify-content-center">
                <KYCForm />
            </div>
        </>
    )
}
