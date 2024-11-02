import Dashboard from "./_components/Dashboard";
import { getMetaTitle } from "@/lib/helpers";

export const metadata = getMetaTitle('Dashboard');

export default function DashboardPage() {
    return (
        <>
            <div className="row justify-content-center">
                <Dashboard />
            </div>
        </>
    )
}
