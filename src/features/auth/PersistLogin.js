import { Outlet, Link } from "react-router-dom";

import { useEffect, useRef, useState } from "react";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

import React from 'react';
import { useRefreshMutation } from "./authApiSlice";

const PersistLogin = () => {
    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)
    const [trueSucess, setTrueSucess] = useState(false);
    
    const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] = useRefreshMutation()
    
    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
            const verifyRefreshToken = async () => {
                console.log('verifying refresh token');

                try {
                    const response = await refresh()
                    const { accessToken } = response.data;
                    console.log(accessToken);
                    setTrueSucess(true)
                } catch (error) {
                    console.log(error);
                }
            }
         if(!token && persist) verifyRefreshToken()
        }
        return () => effectRan.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    
    let content
    if (!persist) {  // persist no
        console.log('not persist');
        content = <Outlet />
    } else if (isLoading) { // persist yes token no
        console.log('loading...');
        content = <p>Loading...</p>
    } else if (isError) {// persist: yes, token no
        console.log('error');
        content = (<p className="errmsg">
            {`${error?.data?.message} - `}
            <Link to={'login'}>Please Login again</Link>
        </p>)
    } else if (!isSuccess && trueSucess) {  // persist yes , token: yes
        console.log("Success");
        content = <Outlet />
    } else if (token && isUninitialized) { // persist: yes, token: yes
        console.log('token and uninit');
        console.log(isUninitialized);
        content = <Outlet />
    }
    return content
}

export default PersistLogin;
