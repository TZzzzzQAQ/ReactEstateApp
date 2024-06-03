import Cookies from "js-cookie";

export function getCookie(name) {
    return Cookies.get(name);
}

export function deleteCookie(name) {
    return Cookies.remove(name);
}