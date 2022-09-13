import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";

import Login from '../components/pages/login/Login';
import Home from "../components/pages/home/Home";
import Budget from "../components/pages/budget/Budget";
import Logout from '../components/logout/index';



import { HomeOutlined, WalletOutlined,LogoutOutlined } from '@ant-design/icons';
import SideBar from "../components/sidebar";


export const items = [
  {
      title: 'Inicio',
      link: '/home',
      icon: <HomeOutlined/>,
      component: <Home/>
  },
  {
      title: 'Presupuestos',
      link: '/budget',
      icon: <WalletOutlined/>,
      component: <Budget/>
  },
  {
    title: 'Salir',
    link: '/exit',
    icon: <LogoutOutlined />,
    component: <Logout/>
}
]


  const Router =  () => {
   
    return (
    <BrowserRouter>
      
      <SideBar/>
     <Routes>
     <Route path="/" element={<Login/>} />
     {items.map((item, index)=>(
      <Route key={index} path={item.link} element={item.component} />
     ))}
     </Routes>
   </BrowserRouter>
    );
  };
  
    export default Router