"use client";

import useUtility from "@/app/_hooks/useUtility";
import Link from "next/link";


export default function PolicyContent({ policy }) {
    const { trans } = useUtility();
    return (
        <>
            <div className="text-end">
                <Link href="/" className="fw-bold home-link"> <i className="las la-long-arrow-alt-left"></i> {trans('Go to Home')}</Link>
            </div>
            <div className="card custom--card">
                <div className="card-header">
                    <h5 className="card-title">{trans(policy.title)}</h5>
                </div>
                <div className="card-body">
                    <div dangerouslySetInnerHTML={{ __html: policy.details }} />
                </div>
            </div>
        </>
    )
}
