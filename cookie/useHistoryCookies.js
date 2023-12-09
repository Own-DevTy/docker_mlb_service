import { useCookies } from 'react-cookie';

export function useHistoryCookies() {
    const [cookies, setCookie, removeCookie] = useCookies(['history']);
    const setHistoryCookie = (name, value, options = undefined) => {
        return setCookie(name, value, options);
    };
    const removeHistoryCookie = (name, options = undefined) => {
        removeCookie(name, options);
    };
    return {
        historyCookies: cookies,
        setHistoryCookie,
        removeHistoryCookie,
    };
}
