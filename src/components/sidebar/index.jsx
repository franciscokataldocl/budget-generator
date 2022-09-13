import React from 'react';
import './style.css';
import logo from '/images/white-logo.png';
import MenuItems from './menuitems/index';
import { useLocation} from 'react-router-dom';




const SideBar = () => {
    const { pathname } = useLocation();
    if(pathname !== '/'){
        return (
            <div className="sidebar purple-gradient">
                <img className="sidebar-logo" src={logo} alt="" />
                <MenuItems/>

        
            </div>
          )
    }
  
}

export default SideBar;