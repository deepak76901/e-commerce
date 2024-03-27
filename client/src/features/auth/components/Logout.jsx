import {useDispatch, useSelector} from "react-redux"
import { useEffect } from "react";
import { logOutAsync, selectLoggedInUser} from "../authSlice";
import { Navigate} from "react-router-dom";

function LogOut() {
    const dispatch = useDispatch()

    const user = useSelector(selectLoggedInUser)

    useEffect(() => {
        dispatch(logOutAsync())
    })
    return ( 
        <>
            {!user && <Navigate to="/login" replace={true} ></Navigate>}
        </>
     );
}

export default LogOut;