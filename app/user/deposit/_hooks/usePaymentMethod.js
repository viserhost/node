import ENDPOINTS from "@/lib/endpoints";
import { getCookie } from 'cookies-next';

export default function usePaymentMethod() {
    const getPaymentMethods = async () => {
        try {
            const accessToken = getCookie('access-token');

            if (!accessToken) {
                throw new Error('Access token not found');
            }

            const response = await fetch(process.env.baseUrl + ENDPOINTS.PAYMENT_METHODS, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                cache: 'no-cache'
            });

            
            if (!response.ok) {
                throw new Error('Failed to fetch payment methods');
            }
            
            const data = await response.json();
            if (data.status === 'success') {
                return {
                    paymentMethods: data.data.methods,
                    imagePath: data.data.image_path
                };
            }
        } catch (error) {
            console.error('Error fetching payment methods:', error);
        }
        return {
            paymentMethods: [],
            imagePath: ''
        };
    }
    return { getPaymentMethods }
}
