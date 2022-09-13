import React, {useState, useEffect} from 'react'
import './style.css';


const Card = ({type, title, data}) => {


  const [total, setTotal] = useState(0);

const colors = {
    income: '#77DF94',
    expense: '#DEC648',
    difference: '#6372FF'
}

useEffect(() => {
 console.log('data from card', data)
 if(data.length >=2){
  setTotal(data[0].total)
 }else{
  setTotal(data)
 }
}, [data])


  return (
    <div className="card-box">
        <div className="card-header" style={{backgroundColor: colors[type]}}>
        <h4>{title}</h4>
        <h3> {total}/ mes</h3>
        
       
        </div>
        {type !== 'difference' ?
<div className="card-body">

<ul>
{data.map((item,index) =>(
  index > 0 && 'object' && <li key={index}><strong>{item?.name}</strong>$ {item?.amount}</li>
))}
</ul>
</div>

: <div className="card-body card-body-cyan"><p>Este es el dinero que mensualmente podras apartar para ahorrar u otros gastos</p></div> 
}
    </div>
    
  )
}

export default Card