import { useDispatch, useSelector } from "react-redux";
import ENDPOINTS from "@/lib/endpoints";
import { updateLanguage } from "@/store/langSlice";

export default function useLanguage() {
    const language = useSelector((state) => state.language.data);
    const status = useSelector((state) => state.language.status);
    const selectedLanguage = useSelector((state) => state.language.selectedLanguage);
    const languages = () => {
        if (status === 'loading') {
            return null;
        }
        if (status === 'succeeded') {
            return language?.data?.languages;
        } else {
            return null;
        }

    }

    const dispatch = useDispatch();
    const changeLang = async (key) => {
        const baseUrl = process.env.baseUrl;
        let response = await fetch(baseUrl + ENDPOINTS.LANG_KEYS + '/' + key);
        response = await response.json();
        localStorage.setItem('lang', response.data.code);
        dispatch(updateLanguage(response));
    }

    return { changeLang, languages, selectedLanguage }
}
