import { ViewTicket } from "@/app/user/support-ticket/[ticket]/_components/ViewTicket";
import { getMetaTitle } from "@/lib/helpers";

export const metadata = getMetaTitle('Ticket Details');

export default function TicketDetails() {
    return <ViewTicket />;
}
