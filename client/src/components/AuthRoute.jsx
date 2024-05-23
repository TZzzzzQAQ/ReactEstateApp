import {getCookie} from "@/utils/tokenUtils";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

const AuthRoute = ({children}) => {
    const isToken = getCookie('access_token');
    const dataFromRedux = useSelector(state => state.user);
    if (isToken && dataFromRedux) {
        return <>{children}</>;
    } else {
        return <Navigate to='/sign-in' replace={true}/>;
    }
};


export default AuthRoute;
