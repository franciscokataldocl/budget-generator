import React, { useState, useEffect } from 'react';
import './style.css';
import MultipleForm from './multipleForm/index';
import { useDispatch, useSelector } from 'react-redux';
import { postBudgets, setBudgetName} from '../../store/slices/budget';
import {  toast } from 'react-toastify';


const BudgetForm = () => {
const [token, setToken] = useState('')



useEffect(() => {
  var getLocal = JSON.parse( localStorage.getItem('credentials'));
  if(getLocal !== null){
    setToken(getLocal.token)
  } 

}, [])


    const { budgets } = useSelector((state) => state.budgets);

    const dispatch = useDispatch();
  //BUDGET TITLE and column title
  const [title, setTitle] = useState('');
  const [rowQuantity, setRowQuantiy] = useState([0]);



  const handleAddTitle = e => {
    setTitle(e.target.value);
  };
  

  useEffect(() => {
    const timer = setTimeout(() => {
        if(title !== ''){
            dispatch(setBudgetName(title))
        }
    }, 1000);
    return () => clearTimeout(timer);
  }, [title]);






  const handleSaveForm = (e) => {
    e.preventDefault();
    console.log('to send to api',budgets)
    //dispatch(postBudgets(token, JSON.stringify(budgets)));
    if(budgets.name !== '' || budgets.rows.length > 0){
      dispatch(postBudgets(token, JSON.stringify(budgets)));
      return;
    }
    toast.warning('Debes agregar un nombre y como mínimo una gasto asociado');

    

  }


  return (
    <div className='budget-form-container'>
      <div className='name-container'>
          <div className='form-group'>
            <label>Nombre del presupuesto</label>
            <input
              className='name-input'
              type='text'
              placeholder='Ingrese Nombre'
              value={title}
              onChange={handleAddTitle}
            />
          </div>
        </div>
      <h3>
        Ingresos o gastos asociados a: <strong>{title}</strong>
      </h3>



      {rowQuantity &&
        rowQuantity.map((item, index) => (
         <MultipleForm key={index} rowQuantity={rowQuantity} setRowQuantiy={setRowQuantiy}/>
        ))}
        <div className="buttons-group">
            <button  onClick={handleSaveForm}  className="btn btn-purple shadow-1 animate-2">GUARDAR</button>
        </div>
    </div>
  );
};

export default BudgetForm;
