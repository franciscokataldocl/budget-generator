import React from 'react';
import { Link } from "react-router-dom";
import { items } from '../../../routes/Router';
import './style.css'
import { LogoutOutlined } from '@ant-design/icons';



const MenuItems = () => {
  return (
    <div className="menu-items-box">
        <ul>
            { items && items.map((item, index)=>(
                <li key={index} className="menu-items"><Link className="animate-3" to={item.link}>{item.icon}{item.title}</Link></li>
            ))

            }
         
        </ul>
    </div>
  )
}

export default MenuItems;