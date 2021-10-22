import { setCookie, getCookie, deleteCookie } from './Cookies';
import { setLocalStorage, getLocalStorage, deleteLocalStorage } from "./LocaleStorage";


export const setAuthentication = (token, user) => {
    setCookie('token', token);
    setLocalStorage('user', user);
}
export const isAuthenticated = () => {
    if(getCookie('token') && getLocalStorage('user')){
        return getLocalStorage('user');
    } else {
        return false;
    }
}
export const logout = (next) => {
    deleteCookie('token');
    deleteLocalStorage('user');
    deleteLocalStorage('cart')
    next();
}