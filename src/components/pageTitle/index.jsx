import React, {useState, useEffect} from 'react';
import { useLocation} from 'react-router-dom';
import './style.css'

const PageTitle = () => {
    const [title, setTitle] = useState('');
    const { pathname } = useLocation();

    useEffect(() => {
    
        if(pathname === '/home'){
            setTitle('Bienvenido');
            return;
        }
        if(pathname === '/budget'){
            setTitle('Presupuestos')
            return;
        }
    
      }, [])


  return (
    <div className="page-title">
        <h1>{title}</h1>
    </div>
  )
}

export default PageTitle