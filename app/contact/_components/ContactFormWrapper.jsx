"use client";

import Link from "next/link";
import useUtility from "@/app/_hooks/useUtility";

export default function ContactFormWrapper({children}) {
    const {trans} = useUtility();
    return (
        <>
            <div className="page-wrapper">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-7 col-xl-5">
                            <div className="text-end">
                                <Link href="/" className="fw-bold home-link"><i className="las la-long-arrow-alt-left"></i> {trans('Go to Home')}</Link>
                            </div>
                            <div className="card custom--card">
                                <div className="card-header">
                                    <h5 className="card-title">{trans('Contact Form')}</h5>
                                </div>
                                <div className="card-body">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
