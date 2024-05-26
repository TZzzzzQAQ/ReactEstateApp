import {requestUser} from "@/axios/requestUser.jsx";

export function userUpdateAPI(id, data) {
    return requestUser({
        method: 'POST',
        url: `/update/${id}`,
        data
    })
}