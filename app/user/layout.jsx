import UserNav from "./_components/UserNav";

export default function layout({children}) {
    return (
        <>
            <UserNav />
            <div className="page-wrapper">
                <div className="container">
                    {children}
                </div>
            </div>
        </>
    )
}
