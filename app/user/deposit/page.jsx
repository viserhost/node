import '@/public/css/payment-card.css';
import { getMetaTitle } from "@/lib/helpers";
import { Deposit } from "./_components/Deposit";

export const metadata = getMetaTitle('Deposit');

export default async function Page() {
    return (
        <>
            <div className="row justify-content-center">
                <div className="col-lg-9">
                    <div className="gateway-card">
                        <Deposit />
                    </div>
                </div>
            </div>
        </>
    )
}
