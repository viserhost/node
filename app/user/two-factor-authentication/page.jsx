import { getMetaTitle } from "@/lib/helpers";
import TwoFaContent from './_components/TwoFaContent';

export const metadata = getMetaTitle('Two Factor Authentication');
export default function page() {
    return (
        <>
            <div className="row justify-content-center">
                <TwoFaContent />
            </div>
        </>
    )
}
