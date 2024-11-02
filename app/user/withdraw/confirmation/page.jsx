import ConfirmationCard from "./_components/ConfirmationCard";
import { getMetaTitle } from "@/lib/helpers";

export const metadata = getMetaTitle('Withdrawal Confirmation');

export default function Confirmation() {

    return (
        <>
            <div className="row justify-content-center">
                <ConfirmationCard />
            </div>
        </>
    )
}
