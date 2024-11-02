import { useState, useEffect } from 'react';

export default function useReferral() {
    const [storedReference, setStoredReference] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const reference = params.get('reference');
            if (reference) {
                window.sessionStorage.setItem('reference', reference);
            }
            setStoredReference(window.sessionStorage.getItem('reference'));
        }
    }, []);

    const setReferral = () => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const reference = params.get('reference');
            if (reference) {
                window.sessionStorage.setItem('reference', reference);
                setStoredReference(reference);
            }
        }
    };

    return { setReferral, storedReference };
}
