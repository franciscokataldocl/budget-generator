import React, { useState, useEffect } from 'react';
import './style.css';
import { PlusCircleOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { setBudgets,clearBudgets } from '../../../store/slices/budget';
import { v4 as uuidv4 } from 'uuid';




const MultipleForm = ({rowQuantity, setRowQuantiy}) => {
    const dispatch = useDispatch();
  
    // const [isDisabled, setIsDisabled] = useState(false);
  const [showButton, setShowButton] = useState(true);


  const initialState = {
    name: '',
    isExpense: false,
    category: 'Hogar',
    subcategory: '',
    amount: 0,
    customId:uuidv4()
  }
  const [formValues, setFormValues] = useState(initialState)


useEffect(() => {

if(rowQuantity.length === 1){
    // setIsDisabled(false)
    // setFormValues({
    //     name: '',
    //     isExpense: false,
    //     category: 'Hogar',
    //     subcategory: '',
    //     amount: 0,
    //   });
      dispatch(clearBudgets())
      setShowButton(true)
}
}, [rowQuantity])


  const handleSubmit = e => {
    // setIsDisabled(!isDisabled)
    e.preventDefault();
    setShowButton(false);
    setRowQuantiy(current => {
        return (
            [...current, rowQuantity[rowQuantity.length - 1] + 1]
        )
    });
    
  };


  const handleChange = (e) =>{
let name = e.target.name;
let value = e.target.value
if(value === 'true'){
value = true

}
if(value === 'false'){
value = false;

}
if(name === 'amount'){
  value = Number(value)
}

setFormValues(prev => ({
    ...prev,
    [name]: value
  }))
  }




  useEffect(() => {
  const timer = setTimeout(() => {
    if(formValues.name !== "" && formValues.amount !== 0 && formValues.amount !== ''){
      console.log('formvalues', formValues)
      dispatch(setBudgets(formValues));
    }
}, 500);
return () => clearTimeout(timer);

  }, [formValues])
  

  return (
    <form onSubmit={handleSubmit}>
           
      <div className='multiple-form'>
        <div className='form-group'>
          <label>Nombre</label>
          <input 
          type='text' 
          placeholder='Ingrese Nombre' 
          name="name"
          value={formValues.name}
          // onChange={(e) => setFormValues(prev => ({
          //   ...prev,
          //   ['name']: e.target.value
          // }))} 
          onChange={(e) => handleChange(e)}
          />
          
        </div>
        <div className='form-group'>
          <label>Tipo</label>
          <select  name='isExpense' value={formValues.isExpense} 
          // onChange={(e) => setFormValues(prev => ({
          //   ...prev,
          //   ['isExpense']: e.target.value === 'true' ? true : false
          // }))}
          onChange={(e) => handleChange(e)}
          >
            <option value='false'>Ingreso</option>
            <option value='true'>Gasto</option>
          </select>
        </div>
        <div className='form-group'>
          <label>Categoría</label>
          <select  name='category' value={formValues.category} 
          // onChange={(e) => setFormValues(prev => ({
          //   ...prev,
          //   ['category']: e.target.value 
          // }))}
          onChange={(e) => handleChange(e)}
          >
            <option value='Hogar'>Hogar</option>
            <option value='Familia o personal'>Familia o Personal</option>
            <option value='Financiero'>Financiero</option>
          </select>
        </div>
        <div className='form-group'>
          <label>Subcategoría</label>
          <input  type='text' placeholder='Agregar' 
          name="subcategory"
          value={formValues.subcategory} 
          // onChange={(e) => setFormValues(prev => ({
          //   ...prev,
          //   ['subcategory']: e.target.value 
          // }))}
          onChange={(e) => handleChange(e)}
          />
        </div>
        <div className='form-group'>
          <label>Monto</label>
          <input  type='number' 
        name='amount' 
          value={formValues.amount} 
          // onChange={(e) => setFormValues(prev => ({
          //   ...prev,
          //   ['amount']: e.target.value 
          // }))}
          onChange={(e) => handleChange(e)}
          />
         
        </div>
       
      </div>
      
      {showButton && (
        <button type='submit' className='add-item shadow-1 animate-2'>
          <PlusCircleOutlined style={{ fontSize: 18 }} />
        </button>
      )}
      
    </form>
    
  );
};

export default MultipleForm;
