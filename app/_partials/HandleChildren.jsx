"use client";

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PreLoader from '@/app/_partials/PreLoader';

export default function HandleChildren({children}) {
    const languageStatus = useSelector((state) => state.language.status);
    const generalSettingStatus = useSelector((state) => state.gs.status);
    const customPageStatus = useSelector((state) => state.customPage.status);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (languageStatus == 'succeeded' && generalSettingStatus == 'succeeded' && customPageStatus == 'succeeded') {
            setLoading(false);
        }
    }, [languageStatus, generalSettingStatus, customPageStatus])

    return loading ? <PreLoader /> : children;
}
