import React, { useState } from 'react';


import './style.css';
import PageTitle from '../../pageTitle/index';
import { PlusCircleOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import BudgetForm from '../../BudgetForm/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../header/index';
import { verifyUser } from '../../../helpers/verifyUser';


const Home = () => {

  //hide add budget button after click on
  const [buttonShow, setButtonShow] = useState(true);

  const handleAddBudget = () => {
    setButtonShow(false);
  };
 

  verifyUser()

  return (
    <div className='home-container margint-sidebar'>
<Header/>

<ToastContainer
position="top-center"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>

      
      <div className='container-box'>
        <PageTitle />
        {buttonShow && (
          <AnimatePresence>
            <motion.button
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              onClick={handleAddBudget}
              className='btn btn-cyan shadow-3 animate-2'
            >
              {' '}
              <span >Crear presupuesto</span>{' '}
              
              <PlusCircleOutlined style={{ fontSize: 18 }} />
            </motion.button>
          </AnimatePresence>
        )}
        {!buttonShow && (
          <AnimatePresence>
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              className='box-container shadow-1'
            >

            <BudgetForm/>

            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Home;
