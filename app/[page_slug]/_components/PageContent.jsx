"use client"

import { useSelector } from "react-redux";

export default function PageContent({ slug }) {
    const customPageData = useSelector((state) => state.customPage.data);
    const page = customPageData.data.pages.find(page => page.slug === slug)
    return (
        <>
            {page && (
                <div>
                    <h1>{page.name}</h1>
                </div>
            )}
        </>
    )
}
