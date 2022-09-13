import React, {useEffect, useState} from 'react';
import PageTitle from '../../pageTitle/index';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import './style.css';
import Card from '../../card/index';
import Header from '../../header/index';
import Animation from './animation/Animation';
import { FilePdfOutlined } from '@ant-design/icons';


import JsPDF from 'jspdf';


const Budget = () => {
  const { result } = useSelector((state) => state.budgets);
  const [hide, setHide] = useState(true)

useEffect(() => {
 console.log('result',result)
if(result.budgetName !== '' || result.incomings.length > 0 ){
  setHide(false)
}

}, [result])

const generatePDF = () =>{
  const report = new JsPDF("landscape", "pt", "a4");
  report.html(document.querySelector('#report')).then(() => {
    report.save('report.pdf');
});
}




  return (
    <>
    {hide ? <div className="animation-container">
<Animation/>
<h3>Aun no has creado un presupuesto</h3>
</div> 
:
<div  className="home-container margint-sidebar">
        <Header/>
      <div className='container-box'>
      <PageTitle />
      
      <AnimatePresence>
            <motion.div
            id="report"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              className='box-container shadow-1'
            >

            <h3 className="result-title">{result.budgetName}</h3>
            <div className="card-container" >

              <Card type="income" title="Ingresos totales" data={result.incomings}/>
              <Card type="expense" title="Gastos recurrentes" data={result.expenses}/>
              <Card type="difference" title="Diferencia / resto" data={result.difference}/>
            </div>
            <div className="pdf-container">
            <button className="export-pdf animate-3" onClick={generatePDF}><FilePdfOutlined/>exportar pdf</button>

            </div>
            </motion.div>
          </AnimatePresence>
      </div>
      
    </div>
}


 
    </>
    
  )
}

export default Budget




