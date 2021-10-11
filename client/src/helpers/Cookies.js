import Cookies from 'js-cookie';
export const setCookie = (key, value) => {
    Cookies.set(key, value, {expires: 24});
}
export const getCookie = key => {
    return Cookies.get(key);
}
export const deleteCookie = key => {
    Cookies.remove(key);
}

//pour communiquer avec server 