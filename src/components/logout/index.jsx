import React, {useEffect} from 'react'
import { logOut } from '../../store/slices/credentials'
import { useDispatch} from 'react-redux';

const Logout = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logOut())
    }, [])
    
  return (
    <div></div>
  )
}

export default Logout;