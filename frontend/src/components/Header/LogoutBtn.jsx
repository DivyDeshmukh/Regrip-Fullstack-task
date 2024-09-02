import React from 'react'
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux";
import {logout} from "../../features/authSlice";
import api from '../../api/api';

function LogoutBtn({children, className}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = async() => {
      try {
          const response = await api.get("/logout");
          console.log(response);
          if (response) {
            dispatch(logout());
            navigate("/login");
          }
      } catch (error) {
          
      }
    }

  return (
    <button onClick={handleClick} className={`${className} px-3 p-2`}>
        {children}
    </button>
  )
}

export default LogoutBtn;


