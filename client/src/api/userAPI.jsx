import {requestUser} from "@/axios/requestUser.jsx";

export function userUpdateAPI(id, data) {
    return requestUser({
        method: 'POST',
        url: `/update/${id}`,
        data
    })
}

export function userDeleteAPI(id, data) {
    return requestUser({
        method: 'DELETE',
        url: `/delete/${id}`,
        data
    })
}