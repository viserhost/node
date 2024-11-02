import { getMetaTitle } from "@/lib/helpers";
import '@/public/css/payment-card.css';
import { Withdraw } from "./_components/Withdraw";

export const metadata = getMetaTitle('Withdraw');

export default async function Page() {
    
    return (
        <>
            <div className="row justify-content-center">
                <div className="col-lg-9">
                    <div className="gateway-card">
                        <Withdraw />
                    </div>
                </div>
            </div>
        </>
    )
}
