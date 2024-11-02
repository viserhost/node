"use client";

import useUtility from '@/app/_hooks/useUtility';
import useCookie from '@/app/_partials/_hooks/useCookie';
import Link from 'next/link';

export default function CookieContent() {
    const { cookie } = useCookie();
    const { trans } = useUtility();

    return (
        <>
            {cookie?.data_values?.status == 1 && (
                <>
                    <div className="text-end">
                        <Link href="/" className="fw-bold home-link"> <i className="las la-long-arrow-alt-left"></i> {trans('Go to Home')}</Link>
                    </div>

                    <div className="card custom--card">
                        <div className="card-header">
                            <h5 className="card-title">{trans('Cookie Policy')}</h5>
                        </div>
                        <div className="card-body">
                            <p dangerouslySetInnerHTML={{ __html: cookie?.data_values?.description }} />
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
