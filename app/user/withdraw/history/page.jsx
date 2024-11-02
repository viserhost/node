import History from "./_components/History";
import { getMetaTitle } from "@/lib/helpers";
export const metadata = getMetaTitle('Withdraw History');

export default function WithdrawHistory() {
    return (
        <>
            <div className="row justify-content-center mt-2">
                <History />
            </div>
        </>
    )
}
