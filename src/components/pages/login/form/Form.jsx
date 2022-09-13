import React, {useState, useEffect} from 'react'
import './style.css';
import logo from '/images/dark-logo.png';
import { EyeOutlined, EyeInvisibleOutlined, LoadingOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from "framer-motion";

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { fetchCredentials} from '../../../../store/slices/credentials';
import { useNavigate } from "react-router-dom";





const Form = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { credentials, credentialeError } = useSelector((state) => state.credentials);




    //state for hide and show input password
    const [showPass, setShowpass] = useState(false);
    const [inputType, setInputType] = useState(false);

    //state of form
    const [formState, setFormState] = useState({
        email:'',
        password:''
    });



    const [error, setError] = useState({
        email:'',
        password: ''
    });

    //state to animation form button on post
    const [isLoading, setIsLoading] = useState(false);


    const [postError, setPostError] = useState(false);

const handleShowPass = () =>{
    setShowpass(!showPass);
    setInputType(!inputType);
}

const handleOnChange = (e) =>{
    setPostError(false)
    setFormState({
        ...formState,
        [e.target.name]: e.target.value
      });    

}

const handleSubmit = (e) =>{
    
    e.preventDefault();

    if(formState.email === '' && formState.password === ''){
        setError({
            ...error,
            email: 'Debes ingresar un email',
            password: 'Debes ingresar una contraseña'
          });
          return;
    }
    setIsLoading(true);
    const params = JSON.stringify({"email":formState.email , "password":formState.password});
    dispatch(fetchCredentials(params));
};



useEffect(() => {
    if(credentials.token !== ''){
        setPostError(false)
        setIsLoading(false);
        return navigate("/home");
    }

   }, [credentials]);

   useEffect(() => {
    if(credentialeError){
        setPostError(true)
        setIsLoading(false);
        setFormState({email:'',
        password:''});  
    } else{
        setPostError(false);
        setIsLoading(false);
    }
   }, [credentialeError])





  return (
    <div className='form-container'>
        <div className="form-box">
            <img className='logo' src={logo} alt="" />
            <h1>Toma el control de tu salud financiera</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                    value={formState.email}
                    onChange={handleOnChange}
                     name="email" className="animate-3" type="text" placeholder='email@email.com' />

                </div>
                <div className="form-group">
                    <label>Contraseña</label>
                    
                    {showPass ? 
                    <EyeInvisibleOutlined onClick={handleShowPass} className="eye-icon animate-2" style={{ fontSize: 22}}/>
                    :
                    <EyeOutlined onClick={handleShowPass} className="eye-icon animate-2" style={{ fontSize: 22}}/>
                    }
                    <input
                    value={formState.password}
                    onChange={handleOnChange}
                     name="password" className="animate-3" type={inputType ? "text" : "password"}  />
                </div>
                <div className="form-group">
               
                {!isLoading ?  <button className='login-button animate-2' type="submit">INGRESAR</button> :
                                <button className='login-button animate-2'> <LoadingOutlined /></button>

                }
                
                </div>
                {postError && 
                <AnimatePresence>
                    <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{y: 0, opacity: 1 }}
                    exit={{y: 10,opacity: 0 }}
                     className="error-post">Credenciales inválidas</motion.p>
                </AnimatePresence>
                
                }
                

            </form>
        </div>
    </div>
  )
}

export default Form