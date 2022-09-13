import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const credentialSlice = createSlice({
    name: 'credentials',
    initialState: {
        credentials:{
            firstname:'',
            lastname: '',
            token:'',

        },
        credentialeError: false
      },
      reducers: {
        setCredentials: (state, action) => {
            const {firstName, lastName, accessToken} = action.payload
            if(firstName !== null || firstName !== '' ){
                state.credentials.firstname = firstName
            }
            if(lastName !== null || lastName !== '' ){
                state.credentials.lastname = lastName
            }
            if(accessToken !== null || accessToken !== '' ){
                state.credentials.token = accessToken
            }
            localStorage.setItem('credentials', JSON.stringify(
                state.credentials
            ));

            state.error = false
            return;

        },
        setError: (state, action) => {
            if(action.payload === 'ERR_BAD_REQUEST'){
                state.credentialeError = true
            } else{
                state.credentialeError = false
            }
          
            // state.error = true
            },
            logOut: (state) =>{
                state.credentials ={
                    firstname:'',
                    lastname: '',
                    token:'',
        
                }
                localStorage.removeItem('credentials');
                window.location.replace("/");

            }
      }
});



export const { setCredentials, setError, logOut } = credentialSlice.actions;

export const credentials = credentialSlice.reducer;

export const fetchCredentials = (params) => (dispatch) => {
    dispatch(setError())
    axios.post(import.meta.env.VITE_LOGIN_AUTH, params,{
        "headers": {
        "content-type": "application/json",
        },
    })
    .then(res => {
        dispatch(setCredentials(res.data))

    }).catch((err) => {
        dispatch(setError(err.code))
    });
  };