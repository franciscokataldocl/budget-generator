
import React, {useEffect} from 'react';
import { useDispatch} from 'react-redux';
import { logOut } from '../store/slices/credentials';

export const verifyUser = () =>{

    const dispatch = useDispatch();
    useEffect(() => {
        const isLogin = localStorage.getItem('credentials');

        if(isLogin === null || isLogin.length === 0 ){
            dispatch(logOut())
        }
    
    }, [])
    


}