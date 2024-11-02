import ENDPOINTS from "@/lib/endpoints";
import { getCookie } from 'cookies-next'

export default function useWithdrawalMethod() {
    const getWithdrawalMethods = async () => {
        try {
            const accessToken = getCookie('access-token');

            if (!accessToken) {
                throw new Error('Access token not found');
            }

            const response = await fetch(process.env.baseUrl + ENDPOINTS.WITHDRAWAL_METHODS, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                next: { revalidate: 60 }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch withdrawal methods');
            }

            const data = await response.json();
            if (data.status === 'success') {
                return {
                    withdrawMethod: data.data.withdrawMethod,
                    imagePath: data.data.imagePath
                };
            }
        } catch (error) {
            console.error('Error fetching withdrawal methods:', error);
        }
        return {
            withdrawMethod: [],
            imagePath: ''
        };
    };

    return { getWithdrawalMethods }
}
