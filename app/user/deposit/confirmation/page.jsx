import ConfirmationCard from "./_components/ConfirmationCard";
import { getMetaTitle } from "@/lib/helpers";

export const metadata = getMetaTitle('Deposit Confirmation');

export default function Confirmation() {
    
    return (
        <>
            <ConfirmationCard />
        </>
    )
}
