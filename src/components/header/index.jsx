import React, {useEffect, useState} from 'react';
import './style.css';
import { useLocation} from 'react-router-dom';


const Header = () => {

    const { pathname } = useLocation();
    const [user, setUser] = useState({
        name: '',
        lastName: '',
    })


    useEffect(() => {
        const localUser = JSON.parse( localStorage.getItem('credentials'));
        if(localUser !== undefined){
            setUser({
                name: localUser.firstname,
                lastName: localUser.lastname,
            })
        }
        
    }, [])
    

    if(pathname !== '/'){
        return (
            <div className="header shadow-1">
                <span><p>Bienvenido: </p>{user.name} {' '} {user.lastName}</span>
            </div>
          )

    }

}

export default Header