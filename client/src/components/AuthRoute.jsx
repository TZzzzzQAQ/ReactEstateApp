import {getCookie} from "@/utils/tokenUtils.jsx";
import {Navigate} from "react-router-dom";

const AuthRoute = ({children}) => {
    const isToken = getCookie('access_token');
    if (isToken) {
        return <>{children}</>
    } else {
        return <Navigate to={'/sign-in'} replace={true}/>
    }
};

export default AuthRoute;