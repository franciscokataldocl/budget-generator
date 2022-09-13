import { createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';
import {  toast } from 'react-toastify';


export const budgetSlice = createSlice({
    name: 'budgets',
    initialState: {
        budgets:{
            name: '',
            rows:[

            ]
        },
        result:{
            budgetName: '',
            incomings:[],
            expenses:[],
            difference: 0
        }
      },
      reducers: {
        setBudgetName:(state, action)=>{
            if(action.payload){
                state.budgets.name = action.payload;
            }

        },
        setBudgets: (state, action) => {
            //comprobamos que rows no este vacio
            if(current(state.budgets.rows).length === 0){
                state.budgets.rows.push(action.payload);
                return
            }

            const existOnState = current(state.budgets.rows).findIndex(obj => obj.customId === action.payload.customId);
            console.log('exist', existOnState)

            if(existOnState === -1){
                state.budgets.rows.push(action.payload);
                return;
            }
            // current(state.budgets.rows)[existOnState] = action.payload
            state.budgets.rows[existOnState]= action.payload
            



    
        },
        clearBudgets: (state, action) =>{
            state.budgets.name = ''
            state.budgets.rows = []
        },
        exposeBudgets: (state) =>{
            return current(state.budgets)
        },
        getResults: (state, action) => {
            toast.success('Tu presupuesto ha sido creado');
            // state.result = [action.payload];
            console.log('api response', action.payload)

            //store budget name in state result
            state.result.budgetName = action.payload.name;

            // //mapear incoming
            let incomingTotal = 0;
            let spendTotal = 0;


            action.payload.rows.map((item)=>{
                //no es un gasto
                if(!item.isExpense){
                    incomingTotal = incomingTotal + item.amount
                    state.result.incomings.push({name: item.name, amount: item.amount})
                }
                //si es un gasto
                if(item.isExpense){
                    spendTotal = spendTotal + item.amount

                    state.result.expenses.push({name: item.name, amount: item.amount})
                }
            });
            state.result.incomings.unshift({total: incomingTotal});
            state.result.expenses.unshift({total: spendTotal});
            state.result.difference = incomingTotal - spendTotal;
            state.budgets = {
                name: '',
            rows:[

            ]
            }

        }        
      }
});



export const { setBudgetName, setBudgets, clearBudgets, exposeBudgets, getResults} = budgetSlice.actions;

export const budgets = budgetSlice.reducer;

export const postBudgets = (token, data) => (dispatch) => {


    axios.post('https://glou-back.herokuapp.com/budgets', data,{
        "headers": {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`
        },
    })
    .then(res => {
        dispatch(getResults(res.data))

    }).catch((err) => {
        
        if(err.response.status === 401) {
            toast.warning('Tu token de sesión a caducado, por favor vuelve a iniciar sesion');
            const redirect = ()=>{
                window.location.replace("/");
            }
            setTimeout(redirect, 5000);

        }
        
    });
  };




