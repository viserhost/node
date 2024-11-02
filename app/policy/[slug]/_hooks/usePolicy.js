import ENDPOINTS from "@/lib/endpoints";
import { request } from "@/lib/helpers";


export default function usePolicy() {

    const getPolicy = async (slug) => {
        const { data } = await request.get(`${ENDPOINTS.POLICY}/${slug}`);
        return data;
    }

    return { getPolicy }
}
