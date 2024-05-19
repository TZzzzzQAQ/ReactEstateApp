import {requestSign} from "@/axios/requestSign.jsx";

export function signUpAPI(data) {
    return requestSign({
        method: "POST",
        url: "/signup",
        data
    })
}

export function signInAPI(data) {
    return requestSign({
        method: "POST",
        url: "/signin",
        data
    })
}

export function signInGoogleAPI(data){
    return requestSign({
        method: "POST",
        url: "/google",
        data
    })
}